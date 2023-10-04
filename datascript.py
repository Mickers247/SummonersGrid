import json

def add_info(champions, attribute, value, champion_names):
    for champ in champions:
        if champ["name"] in champion_names:
            if attribute in champ:
                champ[attribute].append(value)
            else:
                champ[attribute] = [value]

def main():
    # Read JSON data from file
    with open('src/champ-data.json', 'r') as file:
        data = json.load(file)

    # Attributes to add
    attribute_to_add = "skinLines"
    value_to_add = "Soul Fighter"
    champions_to_update = ["Evelynn", "Gwen", "Jhin", "Lux", "Naafiri", "Pyke", "Samira", "Sett", "Shaco", "Viego"]



    # Add information
    print(value_to_add)
    add_info(data["champInformation"], attribute_to_add, value_to_add, champions_to_update)

    # Write updated JSON data back to file
    with open('src/champ-data.json', 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    main()
