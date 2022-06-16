rothor = 0
rotver = 0
ynew = 0
xnew = 0
x = 0
y = 0
yoff = 0
xoff = 0
range2 = 30
range22 = 120
basic.show_leds("""
    . . # . .
        . . # . .
        # # # # #
        . . # . .
        . . # . .
""")

def on_forever():
    global rotver, rothor, x, y, xoff, yoff, xnew, ynew
    rotver = input.rotation(Rotation.PITCH)
    rothor = input.rotation(Rotation.ROLL)
    x = 0 if x + 1 > 4 else x + 1
    y = y if x != 0 else 0 if y + 1 > 4 else y + 1
    xoff = randint(0 - range22 + rothor, range22 + rothor)
    yoff = randint(0 - range22 + rotver, range22 + rotver)
    xoff = 0 if abs(xoff) < range2 else -1 if xoff < 0 else 1
    yoff = 0 if abs(yoff) < range2 else -1 if yoff < 0 else 1
    xnew = x - xoff if x + xoff < 0 or x + xoff > 4 else x + xoff
    ynew = y - yoff if y + yoff < 0 or y + yoff > 4 else y + yoff
    if led.point(x, y) and not (led.point(xnew, ynew)):
        led.toggle(x, y)
        led.toggle(xnew, ynew)
basic.forever(on_forever)
