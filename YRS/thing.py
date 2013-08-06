import sqlite3

conn = sqlite3.connect('MPpicsID.dh')

c = conn.cursor()

c.execute('''CREATE TABLE Mps
             (name, evil rating, Picture URL)''')

conn.commit()
