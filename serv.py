# This is the code
# Find me on discord ZDev1#4511
# We shouldn't install flask in the terminal, it is already imported
from flask import (Flask, request,jsonify)
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
import json
import uuid
from sklearn.metrics.pairwise import pairwise_distances
import skbio
import scipy.stats as stats
from decimal import Decimal as D
import requests
import networkx as nx
from networkx.readwrite import json_graph;
from functForNet import *


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# route
@app.route('/', methods=['POST'])##
@cross_origin()
# route function
def col2df():
  ##df = pd.read_csv("ConsolidadoMainDB.csv")
  file = request.files['file']
  df = pd.read_csv(file)
  listDF = []
  for i in range(len(df.columns)):
    a = pd.unique(df.iloc[:, i].str.replace(' ', ''))
    colname = df.columns[i]
    df2=pd.DataFrame(a, columns=['AGI'])
    df3 = df2[df2.iloc[:, 0].notna()].set_index('AGI').assign(**{colname:1})
    listDF.append(df3)
  conc = pd.concat(listDF, axis=1, ignore_index=False).fillna(0)
  conc.loc[:,'Total'] = conc.sum(axis=1)
  js= conc.to_json(orient="index")
  return(js)

# route recive json y consolida suma
@app.route('/consolidate', methods=['POST'])##
@cross_origin()
# route function
def ToDfObjD3():
  dic = request.get_json()
  listDF = []
  for i in range(len(dic)):
    a = pd.unique(dic[i].get('genes'))
    colname = dic[i].get('author')
    df2=pd.DataFrame(a, columns=['AGI'])
    df3 = df2[df2.iloc[:, 0].notna()].set_index('AGI').assign(**{colname:1})
    listDF.append(df3)
  conc= pd.concat(listDF, axis=1, ignore_index=False).fillna(0)
  conc.rename_axis('genes', inplace=True)
  conc.loc[:,'Total'] = conc.sum(axis=1)
  ##js= conc.to_json(orient='records')## to_dict
  df= conc.T
  listDFs = []
  for i in range(len(df.columns)):
    ndic ={}
    colname = df.columns[i]
    a = df[colname].to_dict()
    ndic['genes'] = colname
    ndic['total'] = a['Total']
    ndic['author'] = a
    ndic['id'] = str(uuid.uuid4())
    for k in list(ndic['author']):
      if k == 'Total':
        del ndic['author'][k]
    listDFs.append(ndic)
  jslis= json.dumps(listDFs)
  return jslis



# route
@app.route('/file')##
@cross_origin()
# route function
def col2dfe():
  df = pd.read_csv("ConsolidadoMainDB.csv")
  ##file = request.files['file']
  ##df = pd.read_csv(file)
  listDF = []
  for i in range(len(df.columns)):
    a = pd.unique(df.iloc[:, i].str.replace(' ', ''))
    colname = df.columns[i]
    df2=pd.DataFrame(a, columns=['AGI'])
    df3 = df2[df2.iloc[:, 0].notna()].set_index('AGI').assign(**{colname:1})
    listDF.append(df3)
  conc= pd.concat(listDF, axis=1, ignore_index=False).fillna(0)
  conc.loc[:,'Total'] = conc.sum(axis=1)
  js= conc.to_json(orient="index")
  return(js)



def routineDF(df):
  listDF = []
  for i in range(len(df.columns)):
    ndic ={}
    colname = df.columns[i]
    a = df[colname].dropna().str.replace(' ', '').unique().tolist()
    ndic['author'] = colname
    ndic['genes'] = a
    ndic['id'] = str(uuid.uuid4())
    listDF.append(ndic)
  jslis= json.dumps(listDF)
  return jslis


# route
@app.route('/lists',methods=['POST','GET'])##
@cross_origin()
# route function
def col2dfeW():
  if request.method == 'POST':
    file = request.files['file']
    df = pd.read_csv(file)
    return routineDF(df)
  else:
    df = pd.read_csv("ConsolidadoMainDB.csv")
    return routineDF(df)





# route
@app.route('/listsp', methods=['POST'])##
@cross_origin()
# route function
def col2dfeWs():
  file = request.files['file']
  df = pd.read_csv(file)
  listDF = []
  for i in range(len(df.columns)):
    ndic ={}
    colname = df.columns[i]
    a = df[colname].dropna().str.replace(' ', '').unique().tolist()
    ndic['author'] = colname
    ndic['genes'] = a
    listDF.append(ndic)
  jslis= json.dumps(listDF)
  return jslis

#### MCD

def ToDfObj(dic):
  listDF = []
  for i in range(len(dic)):
    a = pd.unique(dic[i].get('genes'))
    colname = dic[i].get('author')
    df2=pd.DataFrame(a, columns=['AGI'])
    df3 = df2[df2.iloc[:, 0].notna()].set_index('AGI').assign(**{colname:1})
    listDF.append(df3)
  conc= pd.concat(listDF, axis=1, ignore_index=False).fillna(0)
  conc.rename_axis('genes', inplace=True)
  conc.loc[:,'Total'] = conc.sum(axis=1)
  js= conc.to_json(orient='records')## to_dict
  return(conc)


# route
@app.route('/listsmds', methods=['POST'])##
@cross_origin()
# route function
def MDSJac():
  ndict = request.get_json()
  ty=ToDfObj(ndict)
  fj=ty.loc[:, ty.columns != 'Total']
  jac_sim = pairwise_distances(fj.T, metric = "hamming")
  jac_sim = pd.DataFrame(jac_sim, index=fj.columns, columns=fj.columns)
  my_pcoa = skbio.stats.ordination.pcoa(jac_sim.values)
  # Show the new coordinates for our cities
  pc= my_pcoa.samples[['PC1', 'PC2']].astype(float)
  pc.reset_index(level=0, inplace=True)
  newdf=jac_sim.columns.to_frame().reset_index(drop=True).rename({0: "author"}, axis=1)
  newdf.reset_index(level=0, inplace=True)
  results = pd.concat([newdf, pc], ignore_index=False, sort=False, axis=1)##este
  results.drop(results.columns[[0]], axis=1, inplace=True)##este
  jsc = results.to_dict(orient = 'records')##este
  jslis= json.dumps(jsc)
  return(jslis)


### fisher
def precision_round(number, digits=2):
    power = "{:e}".format(number).split('e')[1]
    return round(number, -(int(power) - digits))

def column_index(df, query_cols):
    cols = df.columns.values
    sidx = np.argsort(cols)
    return sidx[np.searchsorted(cols,query_cols,sorter=sidx)]

def overlap_sets(setA, setB, size=34000):
    """
    Accepts to lists
    M is the population size (previously N)
    n is the number of successes in the population 
    N is the sample size (previously n)
    x is still the number of drawn “successes”
    """
    M=  size #total number of genes in the genome 
    n= len(setA)
    N= len(setB)
    x= len(set(setA).intersection(set(setB)))
    ndict = {}
    ndict['overlap'] = x
    ndict['pval'] = precision_round(stats.hypergeom.sf(x-1, M, n, N))
    ndict['intersect'] = set(setA).intersection(set(setB))
    return(ndict)
    pass 

def MatFish(df):
  result_df = pd.DataFrame(columns = df.columns, index = df.columns)###recibe df de strings
  for col1 in df:
    for col2 in df:
      result_df[col1][col2] = overlap_sets(df[col1].dropna().tolist(),df[col2].dropna().tolist())#.get('pval')
      result_df[col1][col2]["ind"] = column_index(df, col1)
      result_df[col1][col2]["comp"] = col1+ '-' +col2
      result_df[col1][col2]["list1"] = col1
      result_df[col1][col2]["list2"] = col2
      result_df[col1][col2]['id'] = str(uuid.uuid4())
  #pd_fill_diagonal(result_df, 0)
  js= result_df.to_json(orient='records')## to_dict
  return(js)

# route
@app.route('/listsfisher', methods=['POST'])##
@cross_origin()
# route function
def ToDfObjAWMat():### aqui esta recibe json 
  dic = request.get_json()
  #dic = json.loads(dic)
  appended_data = []
  for i in range(len(dic)):
    gh=pd.DataFrame(dic[i].get('genes')).rename(columns={0: dic[i].get('author')})
    appended_data.append(gh)
  appended_datam = pd.concat(appended_data, axis=1)
  res = MatFish(appended_datam)
  return(res)




### funcion para string request
def stringReq(protein_list):
  proteins = '%0d'.join(protein_list)
 
  url = 'https://string-db.org/api/tsv/network?identifiers=' + proteins + '&species=3702' + '&required_score=400'
  r = requests.get(url)
  return r



## function para table de interacciones
def interacTable(r):
  lines = r.text.split('\n') # pull the text from the response object and split based on new lines
  data = [l.split('\t') for l in lines] # split each line into its components based on tabs
  # convert to dataframe using the first row as the column names; drop empty, final row
  df = pd.DataFrame(data[1:-1], columns = data[0]) 
  # dataframe with the preferred names of the two proteins and the score of the interaction
  interactions = df[['preferredName_A', 'preferredName_B','stringId_A','stringId_B', 'score']] 
  return interactions


# route
@app.route('/stringdb', methods=['POST'])##
@cross_origin()
# route function
def retrieveFromString():
  dic = request.get_json()
  valk = []
  for i in dic:
    valk.append(i['genes'])
  ra=stringReq(valk)
  intera =interacTable(ra)
  jsca =  intera.to_dict(orient = 'records')##este
  jslisa= json.dumps(jsca)
  return(jslisa)




 # route 
@app.route('/stringdball', methods=['POST'])##
@cross_origin()
# route function
def jsonToNetTV2():
  loquwserecibeV2 = request.get_json()
  valk = []
  for i in loquwserecibeV2:
    valk.append(i['genes'])
  r= stringReq(valk)
  interactions = interacTable(r)
  nameDic = namesDict(interactions)
  dicGroups= groupDict(loquwserecibeV2,'authQuery')

  G = netwObject(interactions)
  ##T = nx.minimum_spanning_tree(G)
  elh = transformGarrayV3(G)## se escogen valores para recalibrar el tamano de nodos
  finalNodes= finalArrayNod(elh,loquwserecibeV2,nameDic,dicGroups)
  mydict = {}
  mydict['nodes'] = finalNodes
  mydict['links'] = json_graph.node_link_data(G)['links']
  return(mydict)

# route 
@app.route('/stringdballt', methods=['POST'])##
@cross_origin()
# route function
def jsonToNetTV3():
  loquwserecibeV2 = request.get_json()
  valk = []
  for i in loquwserecibeV2:
    valk.append(i['genes'])
  r= stringReq(valk)
  interactions = interacTable(r)
  nameDic = namesDict(interactions)
  dicGroups= groupDict(loquwserecibeV2,'authQuery')

  G = netwObject(interactions)
  T = nx.minimum_spanning_tree(G)
  elh = transformGarrayV3(G)## se escogen valores para recalibrar el tamano de nodos
  finalNodes= finalArrayNod(elh,loquwserecibeV2,nameDic,dicGroups)
  mydict = {}
  mydict['nodes'] = finalNodes
  mydict['links'] = json_graph.node_link_data(T)['links']
  return(mydict)
 


# listen
if __name__ == "__main__":
  #from waitress import serve
  #serve(app, host="0.0.0.0", port=5000)
  app.run(port=5000)
  # if you need to make it live debuging add 'debug=True'
  # app.run(port=3000, debug=True)
  
 # Hope you enjoyed ;)
