
fake_node = {
    "id": '1',
    "position": {"x": 0, "y": 0},
    "data": {"label": "node 1",
             "label": "check",
             "fake_data": "dor and diana"}
}
print(fake_node)


def create_fake_node(dict):
    name = dict["pipeline"][0]["name"]
    print(f"/n{name}/n/n")
