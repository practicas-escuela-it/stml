[# Referencia] https://es.wikipedia.org/wiki/Notaci%C3%B3n_de_Backus-Naur

# Class Diagram
## Sentences

\<creation> ::= \<action> [visibility] \<object> \<object-name>
- create class Vehicle
- create public class Car
- create public class Engine

\<responsabilities> ::= \<object-name> \<verb> \<object-name>
- Car can SpeedUp (crea método)
- Car can Stop (create método)
- Car has isStarted (create atributo de lista)
- Car is Vehicle (aplica herencia)
- Car has Seats (relación por agregación)
- Car is asociated with Wheels 
- Car uses MusicSource (relación por uso, por ej Pendrive, CD)
- Car is composed of Engine (relación por composición)
  
\<scoope> ::= \<object-name> \<verb> [visibility]
- Car is public
- wheel is private