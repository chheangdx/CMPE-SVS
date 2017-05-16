import json
from watson_developer_cloud import RetrieveAndRankV1



def getWatsonConnection():
     retrieve_and_rank = RetrieveAndRankV1(
                        username = '2e1564de-4c5e-4489-b8ba-6e983c1f7733',
                        password = 'BiwVzypXnOKU')

     solr_clusters = retrieve_and_rank.list_solr_clusters()
     print(json.dumps(solr_clusters, indent = 2))

     solr_cluster_id = 'scff9ea129_c91c_46d2_ad7e_036880c59805'
                                          
     status = retrieve_and_rank.get_solr_cluster_status(solr_cluster_id=solr_cluster_id)
     print(json.dumps(status, indent=2))


     configs = retrieve_and_rank.list_configs(solr_cluster_id=solr_cluster_id)
     print(json.dumps(configs, indent=2))

     if len(configs['solr_configs']) > 0:
          collections = retrieve_and_rank.list_collections(solr_cluster_id=solr_cluster_id)
          print(json.dumps(collections, indent=2))

          pysolr_client = retrieve_and_rank.get_pysolr_client(solr_cluster_id, collections['collections'][0])

    
     return pysolr_client




def getAnswer(my_connection, question):
    results = my_conection.search('*' + question + '*')
    print('{0} documents found'.format(len(results.docs)))
    return results.docs




def both(request):

    
    retrieve_and_rank = RetrieveAndRankV1(
                        username = '2e1564de-4c5e-4489-b8ba-6e983c1f7733',
                        password = 'BiwVzypXnOKU')

    solr_clusters = retrieve_and_rank.list_solr_clusters()
    print(json.dumps(solr_clusters, indent = 2))

    solr_cluster_id = 'scff9ea129_c91c_46d2_ad7e_036880c59805'
                                          
    status = retrieve_and_rank.get_solr_cluster_status(solr_cluster_id=solr_cluster_id)
    print(json.dumps(status, indent=2))


    configs = retrieve_and_rank.list_configs(solr_cluster_id=solr_cluster_id)
    print(json.dumps(configs, indent=2))

    if len(configs['solr_configs']) > 0:
    	collections = retrieve_and_rank.list_collections(solr_cluster_id=solr_cluster_id)
    	
    	pysolr_client = retrieve_and_rank.get_pysolr_client(solr_cluster_id, collections[ 'collections'][0])
    	ranker = retrieve_and_rank.list_rankers()['rankers'][0]
    	ranker_id = str(ranker['ranker_id'].decode('utf-8'))
    	query = '*' + request + '*'
    	results = pysolr_client.search(q = query, search_handler = '/fcselect', kwargs = {'ranker_id': ranker_id})
	print('{0} documents found'.format(len(results.docs)))
	   
   
    
    return results.docs
