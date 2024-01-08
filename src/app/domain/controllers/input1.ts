export let input1 = `
class A0
   attribute a0_1 int, a0_2 string
   method m1()
   method m2(tipo int)

class A1 inherits A0
   attribute a1 void, a1_1 void
   composition A4
   association A2

class A2 inherits A3
   attribute a2 void
   method run_a2()
   composition A8 (1-n)
   use A7(1-3)
   association A5 (0-n)

class A3
  attribute a3 void
  use A4

class A4
   attribute a4_1 void, a4_2 int

class B0
   attribute b0_1 char, b0_2 int
   association B1

class B1
   attribute b1_1 int
   composition A1
   association B2

class A5
   attribute a5 void, a5_1 int
   composition A7
   association A6

class A8
   attribute a8_1 float
   association A9

class A6
   attribute a6_1 int, a6_2 string
   association A10

class A7
   attribute a7_1 int

class A9
   attribute a9_1, a9_2 int
   method methodA9(attr1 int)

class A10
   attribute a10_1 int
   method method1(tipo)

class B2
   attribute b2_1 int, b2_2 char
   association B3

class A11 inherits A3
  attribute a11_1 int

class B3
   attribute b3_1 int
   method mb3(p1)
   composition A5
`
