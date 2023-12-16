export let input = `
class Car inherits Vehicle
    attribute isStarted bool,
    tipo int,    conTipo real
    method run (velocity real, aceleration )
    method stop()
    composition Door, Roof
    use Cylinder, Injector
    association Batery, Panel, Engine

class Engine
   attribute piece real, bujia int
   composition DistributionRun, OilFilter
   use Piston
   association Batery

class Gas
       attribute price real, amount real
       composition Door


class Vehicle
   attribute color, cylinders int
   association Gas

class Cylinder
   attribute amount int
   use Piston

class Piston
   attribute potencia real
   composition Objeto1

class Objeto1
   attribute attr1 int, attr1 string
   composition Objeto2

class Objeto2
   attribute attr3 real
   method bobo()
`
