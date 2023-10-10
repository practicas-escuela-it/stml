[# Referencia] https://es.wikipedia.org/wiki/Notaci%C3%B3n_de_Backus-Naur

# Class Diagram
## Sentences

\<creation> ::= \<action> [visibility] \<object> \<object-name>
- create class Vehicle
- create public class Car
- create public class Engine
- create interface Startable
  
\<responsabilities> ::= \<object-name> \<verb> \<object-name>
- Car can SpeedUp (crea método)
- Car can Stop (create método)
- Car knows isStarted (create atributo de lista)
- Car is Vehicle (aplica herencia)
- Car implements Startable (aplica implementación por interface)
- Car has Seats (relación por agregación)
- Car is asociated with Wheels
- Car uses MusicSource (relación por uso, por ej Pendrive, CD)
- Car is composed of Engine (relación por composición)
  
\<scoope> ::= \<object-name> \<verb> [visibility]
- Car is public
- wheel is private


## Example 1
Car is Vehicle -> Vehicle <|-- Car

Car has Seats -> Car o-- Seats : aggregation

## Example 2

create class Car

can SpeedUp

can Stop

end