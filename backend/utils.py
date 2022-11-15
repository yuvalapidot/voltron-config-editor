import yaml
from yaml.loader import BaseLoader

initial_elements = {'nodes': [], 'edges': []}
phase_id = 1
sp_id = 0.1 # step producers' id 

def yaml_to_dict(data):
    return dict(yaml.load(data, Loader=BaseLoader))


 

with open('src/assets/investigation-engine.yaml', 'r') as f:
    data = dict(yaml.load(f, Loader=BaseLoader))
    # print(data)
yaml_piplines = data['pipeline']
# print(len(piplines[0]))
# print(data.keys()


def create_pipelines(yaml_pipelines):
    new_pl = {}
    for pipeline in yaml_piplines:
        new_pl['name'] = pipeline['name']
        new_pl['type'] = pipeline['type']
        new_pl['phases'] = create_phases(pipeline['phases'])
        initial_elements['nodes'].append(new_pl)
        new_pl = {}

def create_phases(yaml_phases):
    pl_phases = []
    phase_node = {}
    length = len(yaml_phases)
    for phase in yaml_phases:
        ind = yaml_phases.index(phase)
        global phase_id
        phase_node['id'] = phase_id
        phase_node['data'] = [phase['name'], phase['type']]

        # decide type of react flow node (default/input/output/group)
        if length == 1 :
            phase_node['type'] = 'group'

        elif ind == 0 :
            phase_node['type'] = 'input'

        elif ind == length - 1 :
            phase_node['type'] = 'output'

        else:
            phase_node['type'] = 'default'
        
        phase_node['step_producers'] = create_step_producers(phase['producers'])
        pl_phases.append(phase_node)
        phase_id += 1
        phase_node={}
    return pl_phases


def  create_step_producers(producers_list):
    phase_step_producers = []
    producer_node = {}
    for sp in producers_list:
        global sp_id
        producer_node['id'] = phase_id + sp_id
        producer_node['data'] = sp['name']
        producer_node['parent_node'] = phase_id
        producer_node['extent'] = 'parent'

        # decide type of react flow node (default/input/output/group)
        if 'run_after' in sp:
            producer_node['type'] = 'output'
            node_to_update = sp['run_after']
            for psp in phase_step_producers:
                if psp['data'] == node_to_update:
                    if psp['type'] == 'group':
                        psp['type'] = 'input'
                    else:
                        psp['type'] = 'default'

        else:
            producer_node['type'] = 'group'

        phase_step_producers.append(producer_node)
        sp_id += 0.1
        producer_node = {}

    return phase_step_producers
        


create_pipelines(yaml_piplines)
print(initial_elements['nodes'])

# print(type(data['pipeline'][0]['phases']))
