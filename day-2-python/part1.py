import re 

RED = 12
BLUE = 14
GREEN = 13

input1 = """Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"""

input1 = open('./input1.txt', 'r')
text = input1.read()
games = text.split('\n')

total = 0
for game in games:
    game_number = int(re.search(r'Game (\d+)', game).group(1))
    red_numbers = re.findall(r'(\d+) red', game)
    blue_numbers = re.findall(r'(\d+) blue', game)
    green_numbers = re.findall(r'(\d+) green', game)

    red_max = max([int(i) for i in red_numbers])
    blue_max = max([int(i) for i in blue_numbers])
    green_max = max([int(i) for i in green_numbers])

    if red_max > RED or blue_max > BLUE or green_max > GREEN: continue
    total += game_number

print(total)