from flask import Flask, g, request, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from bd import Base, User, Gnome, Achievement, init_db, get_session


def create_app():
    app = Flask(__name__)

    DATABASE_URI = 'sqlite:///gnome.db'
    engine = create_engine(DATABASE_URI, echo=True)
    Base.metadata.create_all(engine)
    session_factory = sessionmaker(bind=engine)
    Session = scoped_session(session_factory)

    @app.before_request
    def before_request():
        g.session = Session()

    @app.teardown_appcontext
    def teardown_request(exception=None):
        session = getattr(g, 'session', None)
        if session is not None:
            session.close()

    @app.route('/')
    def hello_world():
        return 'Hello World!'

    # ----- USER API -----


    # Adding a user to the system
    @app.route('/users', methods=['POST'])
    def add_user():
        data = request.json
        session = g.session
        user = User(Username=data['username'], Email=data['email'], Password=data['password'])
        session.add(user)
        session.commit()
        return jsonify({"id": user.ID, "message": f"User {user.Username} added"}), 201

    # Lists all users
    @app.route('/users', methods=['GET'])
    def users():
        session = g.session
        users = session.query(User).all()

        users_info = [{"id": user.ID,
                    "username": user.Username,
                    "email": user.Email,
                    "password": user.Password,
                    "visited_gnomes": [gnome.ID for gnome in user.gnomes],
                    "unlocked_achievements": [achievement.ID for achievement in user.achievements]}
                    for user in users]
        
        return jsonify({"users": users_info})

    # Lists a single user
    @app.route('/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        session = g.session
        user = session.query(User).filter_by(ID=user_id).first()

        if user:
            user_info = {"id": user.ID,
                        "username": user.Username,
                        "email": user.Email,
                        "password": user.Password,
                        "visited_gnomes": [gnome.ID for gnome in user.gnomes],
                        "unlocked_achievements": [achievement.ID for achievement in user.achievements]}
            return jsonify({"user": user_info})
        else:
            return jsonify({"message": f"User with ID {user_id} not found."}), 404
        
    # Lists a single user based on username
    @app.route('/user/<string:username>', methods=['GET'])
    def get_user_id(username):
        session = g.session
        user = session.query(User).filter_by(Username=username).first()

        if user:
            user_info = {"id": user.ID,
                        "username": user.Username,
                        "email": user.Email,
                        "password": user.Password,
                        "visited_gnomes": [gnome.ID for gnome in user.gnomes],
                        "unlocked_achievements": [achievement.ID for achievement in user.achievements]}
            return jsonify({"user": user_info})
        else:
            return jsonify({"message": f"User with Username {username} not found."}), 404
        
    # Modifies user data
    @app.route('/users/<int:user_id>', methods=['PUT'])
    def modify_user(user_id):
        session = g.session
        user = session.query(User).filter_by(ID=user_id).first()

        if user:
            data = request.json
            if 'username' in data:
                user.Username = data['username']
            if 'email' in data:
                user.Email = data['email']
            if 'password' in data:
                user.Password = data['password']
            session.commit()
            return jsonify({"message": f"User with ID {user_id} modified"}), 200
        else:
            return jsonify({"message": f"User with ID {user_id} not found"}), 404

    # Deletes user
    @app.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        session = g.session
        user = session.query(User).filter_by(ID=user_id).first()
        if user:
            session.delete(user)
            session.commit()
            return jsonify({"message": f"User {user.Username} deleted."}), 200
        else:
            return jsonify({"message": f"User with ID {user_id} not found."}), 404

# ----- GNOME API -----


    # Adding a gnome to the system
    @app.route('/gnomes', methods=['POST'])
    def add_gnome():
        data = request.json
        session = g.session
        gnome = Gnome(Name=data['name'], Description=data['description'], Location=data['location'],
                    Image=data['image'])
        session.add(gnome)
        session.commit()
        return jsonify({"message": f"Gnome {gnome.Name} added."}), 201


    # Lists all gnomes
    @app.route('/gnomes', methods=['GET'])
    def gnomes():
        session = g.session
        gnomes = session.query(Gnome).all()

        gnomes_info = [{"id": gnome.ID,
                        "name": gnome.Name,
                        "description": gnome.Description,
                        "location": gnome.Location,
                        "image": gnome.Image,
                        "visited_by": [user.ID for user in gnome.users]} 
                        for gnome in gnomes]

        return jsonify({"gnomes": gnomes_info})


    # Lists a single gnome
    @app.route('/gnomes/<int:gnome_id>', methods=['GET'])
    def get_gnome(gnome_id):
        session = g.session
        gnome = session.query(Gnome).filter_by(ID=gnome_id).first()

        if gnome:
            gnome_info = {"id": gnome.ID,
                        "name": gnome.Name,
                        "description": gnome.Description,
                        "location": gnome.Location,
                        "image": gnome.Image,
                        "visited_by": [user.ID for user in gnome.users]}
            
            return jsonify({"gnome": gnome_info})
        else:
            return jsonify({"message": f"Gnome with ID {gnome_id} not found."}), 404


    # Modifies gnome data
    @app.route('/gnomes/<int:gnome_id>', methods=['PUT'])
    def modify_gnome(gnome_id):
        session = g.session
        gnome = session.query(Gnome).filter_by(ID=gnome_id).first()

        if gnome:
            data = request.json
            if 'name' in data:
                gnome.Name = data['name']
            if 'description' in data:
                gnome.Description = data['description']
            if 'location' in data:
                gnome.Location = data['location']
            if 'image' in data:
                gnome.Image = data['image']

            session.commit()

            return jsonify({"message": f"Gnome with ID {gnome_id} modified"}), 200
        else:
            return jsonify({"message": f"Gnome with ID {gnome_id} not found"}), 404


    # Deletes a gnome
    @app.route('/delete_gnome/<int:gnome_id>', methods=['DELETE'])
    def delete_gnome(gnome_id):
        session = g.session
        gnome = session.query(Gnome).get(gnome_id)
        if gnome:
            session.delete(gnome)

            session.commit()

            return jsonify({"message": f"Gnome {gnome.Name} deleted."}), 200
        else:
            return jsonify({"message": f"Gnome with ID {gnome_id} not found."}), 404


# ----- VISITED GNOMES API -----


    # Adds a gnome to user's visited gnomes
    @app.route('/users/<int:user_id>/gnomes/<int:gnome_id>', methods=['POST'])
    def add_visited_gnome(user_id, gnome_id):
        session = g.session
        user = session.query(User).get(user_id)
        gnome = session.query(Gnome).get(gnome_id)
        if user:
            if gnome:
                user.gnomes.append(gnome)

                session.commit()

                return jsonify({"message": f"Gnome {gnome.Name} added to user {user.Username}'s visited gnomes."}), 200
            else:
                return jsonify({"message": f"Gnome with ID {gnome_id} not found."}), 404
        else:
            return jsonify({"message": f"User with ID {user_id} not found."}), 404


    # Lists all user's visited gnomes
    @app.route('/users/<int:user_id>/gnomes', methods=['GET'])
    def show_visited_gnomes(user_id):
        session = g.session
        user = session.query(User).get(user_id)
        if user:
            visited_gnomes_info = [{"id": gnome.ID,
                                    "name": gnome.Name,
                                    "description": gnome.Description,
                                    "location": gnome.Location,
                                    "image": gnome.Image,
                                    "visited_by": [user.ID for user in gnome.users]}
                                    for gnome in user.gnomes]
            return jsonify({"gnomes": visited_gnomes_info}), 200
        else:
            return jsonify({"message": f"User with ID {user_id} not found."}), 404


    # List one of the user's visited gnomes
    @app.route('/users/<int:user_id>/gnomes/<int:gnome_id>', methods=['GET'])
    def show_one_visited_gnome(user_id, gnome_id):
        session = g.session
        user = session.query(User).get(user_id)
        gnome = session.query(Gnome).get(gnome_id)
        if user:
            if gnome:
                visited_gnome_info = [{"id": gnome.ID,
                                    "name": gnome.Name,
                                    "description": gnome.Description,
                                    "location": gnome.Location,
                                    "image": gnome.Image,
                                    "visited_by": [user.ID for user in gnome.users]}]
                return jsonify({"gnome": visited_gnome_info}), 200
            else:
                return jsonify({"message" f"Gnome with ID {gnome_id} not found in user's visited gnomes"}), 404
        else:
            return jsonify({"message" f"User with ID {user_id} not found"}), 404


# ----- ACHIEVEMENT API -----


    # Adding an achievement to the system
    @app.route('/achievements', methods=['POST'])
    def add_achievement():
        data = request.json
        session = g.session
        achievement = Achievement(Name=data['name'], Condition=data['condition'])
        session.add(achievement)
        session.commit()
        return jsonify({"message": f"Achievement '{achievement.Name}' added."}), 201


    # Listing all achievements
    @app.route('/achievements', methods=['GET'])
    def list_achievements():
        session = g.session
        achievements = session.query(Achievement).all()

        achievements_info = [{"id": achievement.ID,
                            "name": achievement.Name,
                            "condition": achievement.Condition,
                            "unlocked_by": [user.ID for user in achievement.users]}
                            for achievement in achievements]
        
        return jsonify({"achievements": achievements_info})

    # Lists a single achievement
    @app.route('/achievements/<int:achievement_id>', methods=['GET'])
    def list_achievement(achievement_id):
        session = g.session
        achievement = session.query(Achievement).get(achievement_id)

        achievement_info = [{"id": achievement.ID,
                            "name": achievement.Name,
                            "condition": achievement.Condition,
                            "unlocked_by": [user.ID for user in achievement.users]}]
        
        return jsonify({"achievements": achievement_info})
    
    # Modifies an achievement's requirements
    @app.route('/achievements/<int:achievement_id>', methods=['PUT'])
    def modify_achievement(achievement_id):
        session = g.session
        achievement = session.query(Achievement).get(achievement_id)

        if achievement:
            data = request.json
            if 'name' in data:
                achievement.Name = data['name']
            if 'condition' in data:
                achievement.Condition = data['condition']

            session.commit()
            
            return jsonify({"message": f"Achievement with ID {achievement_id} modified"}), 200
        else:
            return jsonify({"message": f"Achievement with ID {achievement_id} not found"}), 404


# ----- USERS' ACHIEVEMENTS API -----


    # Unlocks specified achievement for the user
    @app.route('/users/<int:user_id>/achievements/<int:achievement_id>', methods=['POST'])
    def unlock_achievement(user_id, achievement_id):
        session = g.session
        user = session.query(User).get(user_id)
        achievement = session.query(Achievement).get(achievement_id)

        if user:
            if achievement:
                user.achievements.append(achievement)

                session.commit()

                return jsonify({"message": f"Achievement '{achievement.Name}' unlocked by user {user.Username}"}), 200
            else:
                return jsonify({"message": f"Achievement with ID {achievement_id} not found."}), 404
        else:
            return jsonify({"message": f"User with ID {user_id} not found."}), 404


    # Lists all of user's achievements
    @app.route('/users/<int:user_id>/achievements', methods=['GET'])
    def show_user_achievements(user_id):
        session = g.session
        user = session.query(User).get(user_id)
        if user:
            unlocked_achievements_info = [{
                                    "id": achievement.ID,
                                    "name": achievement.Name,
                                    "condition": achievement.Condition,
                                    "unlocked_by": [user.ID for user in achievement.users]}
                                    for achievement in user.achievements]
            return jsonify({"achievements": unlocked_achievements_info}), 200
        else:
            return jsonify({"message": f"User with ID {user_id} not found."}), 404


    # List one of the user's achievements
    @app.route('/users/<int:user_id>/achievements/<int:achievement_id>', methods=['GET'])
    def show_one_achievement(user_id, achievement_id):
        session = g.session
        user = session.query(User).get(user_id)
        achievement = session.query(Achievement).get(achievement_id)
        if user:
            if achievement:
                achievement_info = [{"id": achievement.ID,
                                    "name": achievement.Name,
                                    "condition": achievement.Condition,
                                    "unlocked_by": [user.ID for user in achievement.users]}]
                return jsonify({"achievement": achievement_info}), 200
            else:
                return jsonify({"message" f"Achievement with ID {achievement_id} not found in user's visited gnomes"}), 404
        else:
            return jsonify({"message" f"User with ID {user_id} not found"}), 404


    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
