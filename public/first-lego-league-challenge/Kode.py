import motor
import runloop
from hub import port

class Fork:
    def __init__(self, port, speed, at_bottom):
        self.port = port
        self.speed = speed
        self.bottom = 0
        self.top = 360
        if at_bottom:
            self.angle = self.bottom
        else:
            self.angle = self.top


    async def go_to_top(self, factor=1.0):
        new_pos = int(self.top * factor)
        await motor.run_for_degrees(self.port, new_pos - self.angle, self.speed)
        self.angle = new_pos

    async def go_to_bottom(self, factor=1.0):
        new_pos = int(self.angle * factor)
        await motor.run_for_degrees(self.port, -new_pos, self.speed)
        self.angle = self.angle - new_pos

class Car:
    def __init__(self, left_port, right_port, speedLeft, speedRight):
        self.left_port = left_port
        self.right_port = right_port
        self.speedLeft = speedLeft
        self.speedRight = speedRight

    async def drive_forward(self, duration):
        motor.run_for_time(self.left_port, duration, -self.speedLeft)
        await motor.run_for_time(self.right_port, duration, self.speedRight)

    async def drive_backward(self, duration):
        motor.run_for_time(self.left_port, duration, self.speedLeft)
        await motor.run_for_time(self.right_port, duration, -self.speedRight)

    async def turn_left(self, degrees):
        degrees *= 2
        motor.run_for_degrees(self.left_port, degrees, self.speedLeft)
        await motor.run_for_degrees(self.right_port, degrees, self.speedRight)

    async def turn_right(self, degrees):
        degrees *= 2
        motor.run_for_degrees(self.left_port, degrees, -self.speedLeft)
        await motor.run_for_degrees(self.right_port, degrees, -self.speedRight)



class Course():
    def __init__(self, car, fork):
        self.car = car
        self.fork = fork

    async def seaweed(self):
        await self.fork.go_to_top()
        await self.fork.go_to_top()
        await self.car.drive_forward(2000)
        await self.fork.go_to_bottom()
        await self.fork.go_to_bottom()
        await self.car.drive_backward(2000)
        await self.fork.go_to_bottom() # end
    
    async def shark(self): #PLASSER: parallelt med bordet, på den første Nen i "challenge"
        await self.car.drive_forward(2900)
        await self.fork.go_to_top()
        await self.car.turn_left(45)
        await self.car.drive_forward(370)
        await self.fork.go_to_bottom()
        await self.fork.go_to_top()
        await self.car.drive_backward(600)
        await self.car.turn_right(60)
        await self.car.drive_backward(2700)
        await self.fork.go_to_bottom() # end

    async def flowerbed(self): #PLASSER: helt inntil veggen, dekker "o"-en i lego med venstre dekk.
        await self.car.drive_forward(300)
        await runloop.sleep_ms(300)
        await self.car.turn_left(5)
        await runloop.sleep_ms(300)
        await self.car.drive_forward(2100)
        await self.car.turn_right(90)
        await self.fork.go_to_top()
        await self.car.turn_left(40)
        await self.car.drive_forward(850)
        await self.car.turn_left(125)
        await self.car.drive_forward(300)
        await self.fork.go_to_bottom(0.4)
        await self.car.drive_forward(500) # <-- flower push
        await runloop.sleep_ms(1000)
        await self.car.drive_backward(500)
        await self.car.turn_left(65)
        await self.fork.go_to_bottom()
        await self.car.drive_forward(2500)
    
    async def switch_side(self): #PLASSER: helt inntil veggen, dekker "o"-en i lego med venstre dekk.
        await self.car.drive_forward(1500)
        await self.car.turn_right(100)
        await self.car.drive_forward(4000)
        await self.car.turn_right(10)
        await self.car.drive_forward(2500)




async def main():
    fork = Fork(port.E, 10000, True) # IMPORTANT set at_bottom to correct value
    car = Car(port.C, port.D, 500, 500)
    course = Course(car, fork)

    #await course.flowerbed()
    #await course.shark()
    await course.switch_side()

runloop.run(main())
