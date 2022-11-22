
fake_node = {
    "id": '1',
    "position": {"x": 0, "y": 0}
}
print(fake_node)


def create_fake_node(dict):
    name = dict["pipeline"][0]["name"]
    print(f"/n{name}/n/n")
