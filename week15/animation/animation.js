export class Timeline {
  tick() {
    console.log('tick')
    requestAnimationFrame(()=> this.tick())
  }
  start() {
    this.tick()
  }
}

export class Animation {

}

/*

let animation = new Animation(
  object,
  prop,
  start,
  end,
  duration,
  delay,
  timingFunction
)

let timeline = new Timeline
timeline.add(animation_1)
timeline.add(animation_2)

timeline.start()

timeline.stop()

timeline.pause()

timeline.resume()

setTimeout
setInterval
requestAnimationFrame

*/
