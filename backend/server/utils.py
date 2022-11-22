import yaml
from yaml.loader import BaseLoader



initial_elements = {'nodes': [], 'edges': []}
phase_id = 1
sp_id = 0.1  # step producers' id


def yaml_to_dict(data):
    return dict(yaml.load(data, Loader=BaseLoader))


with open('src/assets/investigation-engine.yaml', 'r') as f:
    data = dict(yaml.load(f, Loader=BaseLoader))
#     # print(data)
yaml_piplines = data['pipeline']
# # print(len(piplines[0]))
# # print(data.keys()


def create_pipelines(yaml_pipelines):
    new_pl = {}
    for pipeline in yaml_pipelines:
        new_pl['name'] = pipeline['name']
        new_pl['type'] = pipeline['type']
        phases, edges = create_phases(pipeline['phases'], pipeline['type'])
        new_pl['phases'] = phases
        initial_elements['nodes'].append(new_pl)
        if len(edges) != 0:
            initial_elements['edges'].extend(edges)        
        new_pl = {}


def create_phases(yaml_phases, type):
    pl_phases = []
    pl_inner_edges = []
    phase_node = {}
    length = len(yaml_phases)
    for phase in yaml_phases:
        ind = yaml_phases.index(phase)
        global phase_id
        phase_node['id'] = phase_id
        phase_node['data'] = [phase['name'], phase['type']]

        # decide type of react flow node (default/input/output/group)
        if type == 'loop':
            phase_node['type'] = 'default'
        elif length == 1:
            phase_node['type'] = 'group'

        elif ind == 0:
            phase_node['type'] = 'input'

        elif ind == length - 1:
            phase_node['type'] = 'output'

        else:
            phase_node['type'] = 'default'

        step_producers, inner_edges = create_step_producers(phase['producers'])
        phase_node['step_producers'] = step_producers 
        pl_phases.append(phase_node)
        if len(inner_edges) != 0:
            pl_inner_edges.extend(inner_edges)
        phase_id += 1
        global sp_id
        sp_id = 0.1
        phase_node = {}
    return pl_phases, pl_inner_edges


def create_step_producers(producers_list):
    phase_step_producers = []
    inner_edges = []
    # print(inner_edges)
    producer_node = {}
    for sp in producers_list:
        global sp_id
        new_id = phase_id + sp_id
        producer_node['id'] = new_id
        producer_node['data'] = sp['name']
        producer_node['parent_node'] = phase_id
        producer_node['extent'] = 'parent'

        # decide type of react flow node (default/input/output/group)
        if 'run_after' in sp:
            producer_node['type'] = 'output'
            node_to_update = sp['run_after']
            for psp in phase_step_producers:
                if psp['data'] in node_to_update:
                    if psp['type'] == 'group':
                        psp['type'] = 'input'
                    else:
                        psp['type'] = 'default'
                    inner_edges.append(create_inner_edges(psp['id'], new_id))

        else:
            producer_node['type'] = 'group'

        phase_step_producers.append(producer_node)
        sp_id += 0.1
        producer_node = {}

    return phase_step_producers, inner_edges


# handle edges
def create_edges(pipelines):
    # print(pipelines)
    edges = []
    new_edge = {}
    for pipeline in pipelines:
        # print(pipeline['type']=='loop')
        if len(pipeline) > 1:
            for i in range(len(pipeline['phases']) - 1):
                new_edge['id'] = 'e' + str(pipeline['phases'][i]['id']) + '-' + str(pipeline['phases'][i+1]['id'])
                new_edge['source'] = pipeline['phases'][i]['id']
                new_edge['target'] = pipeline['phases'][i+1]['id']
                edges.append(new_edge)
                new_edge={}
        if pipeline['type'] == 'loop':  # If the pipeline is of type 'loop', add an edge between the first phase and the last
            new_edge['id'] = 'e' + str(pipeline['phases'][0]['id']) + '-' + str(pipeline['phases'][-1]['id'])
            new_edge['source'] = pipeline['phases'][0]['id']
            new_edge['target'] = pipeline['phases'][-1]['id']
            edges.append(new_edge)
            new_edge={}

    print(edges)


# a function that creates the edge of the step producer DAG
def create_inner_edges(src, target): 
    new_edge = {}
    new_edge['id'] = 'e' + str(src) + '-' + str(target)
    new_edge['source'] = str(src)
    new_edge['target'] = str(target)
    print(new_edge)
    return new_edge



create_pipelines(yaml_piplines)
print(initial_elements['nodes'])
print(initial_elements['edges'])

# create_edges(initial_elements['nodes'])
# create_inner_edges(initial_elements['nodes'])

# create_pipelines(yaml_piplines)
# print(initial_elements['nodes'][1])

# print(type(data['pipeline'][0]['type']))
# lst=[1,2,3]
# print(range(len(lst)))
# for i in range(len(lst)):
#     print(i)