from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, scoped_session


Base = declarative_base()


user_gnome_association = Table('User_Gnome', Base.metadata,
                               Column('UserID', Integer, ForeignKey('User.ID'), primary_key=True),
                               Column('GnomeID', Integer, ForeignKey('Gnome.ID'), primary_key=True)
                               )

user_achievement_association = Table('User_Achievement', Base.metadata,
                                     Column('UserID', Integer, ForeignKey('User.ID'), primary_key=True),
                                     Column('AchievementID', Integer, ForeignKey('Achievement.ID'), primary_key=True)
                                     )

class User(Base):
    __tablename__ = 'User'
    ID = Column(Integer, primary_key=True, autoincrement=True)
    Username = Column(String(255), nullable=False, unique=True)
    Email = Column(String(255), nullable=False)
    Password = Column(String(255), nullable=False)

    gnomes = relationship('Gnome', secondary=user_gnome_association, back_populates='users')
    achievements = relationship('Achievement', secondary=user_achievement_association, back_populates='users')

class Gnome(Base):
    __tablename__ = 'Gnome'
    ID = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(255), nullable=False, unique=True)
    Description = Column(String(255))
    Location = Column(String(255))
    Image = Column(String(255))

    users = relationship('User', secondary=user_gnome_association, back_populates='gnomes')

class Achievement(Base):
    __tablename__ = 'Achievement'
    ID = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(255), nullable=False, unique=True)
    Condition = Column(String(255))

    users = relationship('User', secondary=user_achievement_association, back_populates='achievements')

def init_db(engine):
    Base.metadata.create_all(engine)

def get_session(engine):
    session_factory = sessionmaker(bind=engine)
    Session = scoped_session(session_factory)
    return Session
