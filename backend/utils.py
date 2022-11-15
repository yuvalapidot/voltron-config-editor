import yaml
from yaml.loader import BaseLoader


def yaml_to_dict(data):
    return dict(yaml.load(data, Loader=BaseLoader))


initial_elements = {'nodes': {}, 'edges': {}}
phase_id = 0

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


def create_phases(yaml_phases):
    phase_nodes = {}
    for phase in yaml_phases:
        phase_nodes['id'] = phase_id
        # phase


create_pipelines(yaml_piplines)
