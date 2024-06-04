import requests

BASE_URL = 'http://localhost:5000'

# ----- USER API -----


# DZIAŁA POPRAWNIE
def add_user(username, email, password):
    url = f'{BASE_URL}/users'
    data = {
        "username": username,
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# DZIAŁA POPRAWNIE
def modify_user(user_id, username, email, password):
    url = f'{BASE_URL}/users/{user_id}'
    new_data = {
        "username": username,
        "email": email,
        "password": password
    }
    response = requests.put(url, json=new_data)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# DZIAŁA POPRAWNIE
def delete_user(user_id):
    url = f'{BASE_URL}/users/{user_id}'
    response = requests.delete(url)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowanie JSON:", response.text)


# ----- GNOME API -----


# DZIAŁA POPRAWNIE
def add_gnome(name, description, location, image):
    url = f'{BASE_URL}/gnomes'
    data = {
        "name": name,
        "description": description,
        "location": location,
        "image": image
    }
    response = requests.post(url, json=data)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# DZIAŁA POPRAWNIE
def modify_gnome(gnome_id, name, description, location, image):
    url = f'{BASE_URL}/gnomes/{gnome_id}'
    new_data = {
        "name": name,
        "description": description,
        "location": location,
        "image": image
    }
    response = requests.put(url, json=new_data)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# DZIAŁA POPRAWNIE
def delete_gnome(gnome_id):
    url = f'{BASE_URL}/delete_gnome/{gnome_id}'
    response = requests.delete(url) 
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# ----- VISITED GNOMES API -----


# DZIAŁA POPRAWNIE
def add_visited_gnome(user_id, gnome_id):
    url = f'{BASE_URL}/users/{user_id}/gnomes/{gnome_id}'
    response = requests.post(url)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# ----- ACHIEVEMENT API -----


# DZIAŁA POPRAWNIE
def add_achievement(name, condition):
    url = f'{BASE_URL}/achievements'
    data = {
        "name": name,
        "condition": condition
    }
    response = requests.post(url, json=data)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# DZIAŁA POPRAWNIE
def modify_achievement(achievement_id, name, condition):
    url = f'{BASE_URL}/achievements/{achievement_id}'
    new_data = {
        "name": name,
        "condition": condition
    }
    response = requests.put(url, json=new_data)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# ----- USERS' ACHIEVEMENTS API -----


# DZIAŁA POPRAWNIE
def unlock_achievement(user_id, achievement_id):
    url = f'{BASE_URL}/users/{user_id}/achievements/{achievement_id}'
    response = requests.post(url)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


# ----- OTHER -----


# DZIAŁA, ALE ZBĘDNE
def list_gnomes():
    url = f'{BASE_URL}/gnomes'
    response = requests.get(url)
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Błąd dekodowania JSON:", response.text)


if __name__ == '__main__':
    # ----- TESTS -----

    # add_user("art", "something@gmal.com", "thisispassword")
    # add_gnome("Papa Krasnal", "Najstarszy w mieście", "Świdnicka", "papa.png")
    # add_gnome("Życzliwek", "Jeden z najsłynniejszych we Wrocławiu", "Rynek Ratusz 7/9", "zyczliwek.png")
    # add_gnome("Syzyfki", "Od lat pchają tę samą kulę, niczym Syzyf", "Świdnicka 1", "syzyfki.png")
    # add_gnome("Rzeźnik", "Krasnoludzki sprzedawca wędlin", "Jatki 11", "rzeznik.png")
    # add_gnome("Pracz Odrzański", "Nieprzerwanie myje w Odrze ubrania", "Katedralna przy moście Piaskowym", "pracz.png")
    # add_gnome("Szermierz z parasolem", "Stoi dumnie przy uniwersytecie", "plac Uniwersytecki 1", "szermierz.png")
    # add_gnome("Strażnik Śpioch", "Niech nikt go nie budzi na służbie", "Św. Mikołaja 1", "straznik.png")
    # add_gnome("Więziennik", "Odsiedział swoje, jednak ku przestrodze innym nadal siedzi za kratami", "Więzienna 6", "wieziennik.png")
    # add_gnome("Helpik", "Razem z Bulbulkiem obserwują ludzi w wodzie", "Teatralna 10/12", "helpik.png")
    # add_gnome("Bulbulek", "Pływanie to jego pasja", "Teatralna 10/12", "bulbulek.png")
    # add_gnome("Test", "Test API", "Jakiś adres", "test.png")
    # modify_gnome(1, "Papa Krasnal", "Najstarszy w mieście", "Świdnicka", "papa.png")
    # modify_gnome(11, "Test2", "Test API 2", "Jakiś adres 2", "test2.png")
    # delete_gnome(11)

    # add_user("jkowalski", "jkowalski@gmail.com", "jkowal")
    # add_user("anowak", "anowak@gmail.com", "anow")
    # add_user("twisniewski", "twisniewski@gmail.com", "twisnie")
    # delete_user(2)
    # delete_user(3)
    # modify_user(3, "twisniewska", "twisniewska@gmail.com", "twisnia")

    # add_visited_gnome(3, 1)
    # add_visited_gnome(2, 1)
    # add_visited_gnome(2, 3)
    # add_visited_gnome(2, 5)
    # add_visited_gnome(2, 7)
    # add_visited_gnome(2, 9)
    # add_visited_gnome(1, 9)
    # add_visited_gnome(1, 2)
    # add_visited_gnome(1, 4)
    # add_visited_gnome(1, 6)
    # add_visited_gnome(1, 8)
    # add_visited_gnome(1, 10)
    # add_visited_gnome(2, 10)

    # add_achievement("first Step", "complete the tutorial")
    # modify_achievement(1, "Pierwsze kroki", "Zakończ samouczek")
    # modify_achievement(2, "Poszukiwacz krasnali", "Odwiedź 10 krasnali")
    # modify_achievement(3, "Łowca krasnali", "Odwiedź 50 krasnali")
    # modify_achievement(4, "Znawca krasnali", "Odwiedź 100 krasnali")
    # add_achievement("Pierwszy krasnal", "Odźwiedź swojego pierwszego krasnala")
    # add_achievement("Gnome seeker", "Visit 10 gnomes")
    # add_achievement("Gnome hunter", "Visit 50 gnomes")
    # add_achievement("Gnome expert", "Visit 100 gnomes")
    # add_achievement("Wielki ojciec krasnali", "Odnajdź Papę Krasnala")
    # modify_achievement(6, "Więzienny los", "Odnajdź Więziennika")

    # unlock_achievement(1, 1)
    # unlock_achievement(2, 1)
    # unlock_achievement(1, 2)
    # unlock_achievement(2, 2)
    # unlock_achievement(1, 5)
    # unlock_achievement(2, 5)
    unlock_achievement(1, 6)

    # list_gnomes()