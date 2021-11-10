### The required libraries and packages ###
import networkx as nx
import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm
from networkx.readwrite import json_graph;
import json





### funcion para string request
def stringReq(protein_list):
  proteins = '%0d'.join(protein_list)
  url = 'https://string-db.org/api/tsv/network?identifiers=' + proteins + '&species=3702'
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


## names dictionary
def namesDict(interaTable):
  dict1= pd.Series(interaTable.stringId_A.values,index=interaTable.preferredName_A).to_dict()
  dict2= pd.Series(interaTable.stringId_B.values,index=interaTable.preferredName_B).to_dict()
  z = {**dict1, **dict2}
  return(z)

## funcion para network object
def netwObject(interactionsT):
  G=nx.Graph(name='Protein Interaction Graph')
  interactions = np.array(interactionsT)
  for i in range(len(interactions)):
    interaction = interactions[i]
    a = interaction[0] # protein a node
    b = interaction[1] # protein b node
    w = float(interaction[4]) # score as weighted edge where high scores = low weight
    G.add_weighted_edges_from([(a,b,w)]) # add weighted edge to graph
  #print(nx.info(G))
  return G

##### insert obs
# Insert dictionary item into a dictionary at specified position: 
def insert_item(dic, item={}, pos=None):
    """
    Insert a key, value pair into an ordered dictionary.
    Insert before the specified position.
    """
    from collections import OrderedDict
    d = OrderedDict()
    # abort early if not a dictionary:
    if not item or not isinstance(item, dict):
        print('Aborting. Argument item must be a dictionary.')
        return dic
    # insert anywhere if argument pos not given: 
    if not pos:
        dic.update(item)
        return dic
    for item_k, item_v in item.items():
        for k, v in dic.items():
            # insert key at stated position:
            if k == pos:
                d[item_k] = item_v
            d[k] = v
    return d



# function to rescale list of values to range [newmin,newmax]
def rescale(l,newmin,newmax):
    arr = list(l)
    return [(x-min(arr))/(max(arr)-min(arr))*(newmax-newmin)+newmin for x in arr]


### core
def transformGarrayV3(G):
  # use the matplotlib plasma colormap
  graph_colormap = cm.get_cmap('plasma', 12)
  # node color varies with Degree
  c = rescale([G.degree(v) for v in G],0.0,0.9) 
  c = [graph_colormap(i) for i in c]
  # node size varies with betweeness centrality - map to range [10,100] 
  deg= nx.degree(G)
  bce = nx.betweenness_centrality(G) # betweeness centrality
  c_c = nx.closeness_centrality(G)## close centrality
  bet_c = nx.betweenness_centrality(G, normalized = True, endpoints = False)##betweenness_centrality
  pr = nx.pagerank(G, alpha = 0.8)## pagerank
  ei_c = nx.eigenvector_centrality(G)## eigenvector_centrality
##

  s1 =  rescale([v for v in bce.values()],1500,7000)
  s2 =  rescale([v for v in c_c.values()],1500,7000)
  s3 =  rescale([v for v in bet_c.values()],1500,7000)
  s4 =  rescale([v for v in pr.values()],1500,7000)
  s5 =  rescale([v for v in ei_c.values()],1500,7000)
##
  s6 = [v for v in bce.values()]
  s7 = [v for v in c_c.values()]
  s8 = [v for v in bet_c.values()]
  s9 = [v for v in pr.values()]
  s10 = [v for v in ei_c.values()]
  s11 = list(deg)
  

  # edge width shows 1-weight to convert cost back to strength of interaction 
  ew = rescale([float(G[u][v]['weight']) for u,v in G.edges],0.1,4)
  # edge color also shows weight
  ec = rescale([float(G[u][v]['weight']) for u,v in G.edges],0.1,1)
  ec = [graph_colormap(i) for i in ec]
  jsfG=json_graph.node_link_data(G)
  newNodes= []
  for i in range(len(jsfG['nodes'])):
    tempElem= jsfG['nodes'][i]
    ##
    insert_item(tempElem, item={'node_colorA': "rgba" + str(tuple(list(c[i])))})
    insert_item(tempElem, item={'node_size1': s1[i]})
    insert_item(tempElem, item={'node_size2': s2[i]})
    insert_item(tempElem, item={'node_size3': s3[i]})
    insert_item(tempElem, item={'node_size4': s4[i]})
    insert_item(tempElem, item={'node_size5': s5[i]})

##
    
    insert_item(tempElem, item={'bce1': s6[i]}) 
    insert_item(tempElem, item={'c_c2': s7[i]}) 
    insert_item(tempElem, item={'bet_c3': s8[i]}) 
    insert_item(tempElem, item={'pr4': s9[i]}) 
    insert_item(tempElem, item={'ei_c5': s10[i]})
    insert_item(tempElem, item={'deg': s11[i]})


    insert_item(tempElem, item={'genes':jsfG['nodes'][i]['id'] })
    insert_item(tempElem, item={'label':jsfG['nodes'][i]['id'] })
    newNodes.append(tempElem)
  return(newNodes)


####
def search(loquwserecibeV2,name):
    for p in loquwserecibeV2:
        if p['genes'] == name:
            return p

# Function to return unique elements:
def unique(input_list):
	return list(set(input_list))


def searchDic(dic,name):
  for the_key, the_value in dic.items():
    if the_key == name:
      return the_value

def groupDict(loquwserecibeV2,field):
  alist=[]
  for i in range(len(loquwserecibeV2)):
    tempH = loquwserecibeV2[i][field]##'authQuery'
    nvas = {key: value for key, value in tempH.items() if value}
    nvasSt = keys = "_".join(list(nvas.keys()))
    alist.append(nvasSt)
  newAlist = unique(alist)
  dictGroup= {}
  for i in range(len(newAlist)):
    tempD = {newAlist[i]: i}
    dictGroup.update(tempD)
  return(dictGroup)

def finalArrayNod(elh,loquwserecibeV2,dic,dicGroups):
  finalArrayNode =[]
  for i in range(len(elh)):
    tempElemT= elh[i]
    name2 = searchDic(dic,elh[i]["id"])
    insert_item(tempElemT, item={'name2': name2.split('.')[1].strip()})
    vas = search(loquwserecibeV2,tempElemT["name2"])## name2
    
    
    if vas is not None:
      insert_item(tempElemT, item={'orgData': vas})
      #insert_item(tempElemT, item={'orgData': vas})
    #else:
    #  insert_item(tempElemT, item={'orgData': name2.split('.')[1].strip()})
    ##
      nvas = {key: value for key, value in vas['authQuery'].items() if value}
      nvasSt = keys = "_".join(list(nvas.keys()))
      insert_item(tempElemT, item={'groupQuery': nvasSt})

      group2 = searchDic(dicGroups,tempElemT["groupQuery"])
      insert_item(tempElemT, item={'group': group2})
    ## add group background author
      nvasB = {key: value for key, value in vas['author'].items() if value}
      nvasStB = keys = "_".join(list(nvasB.keys()))
      insert_item(tempElemT, item={'groupBackground': nvasStB})

      group2B = searchDic(dicGroups,tempElemT["groupBackground"])
      insert_item(tempElemT, item={'group2': group2B})
    
    
    
    finalArrayNode.append(tempElemT)
  return(finalArrayNode)





####

