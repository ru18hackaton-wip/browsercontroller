class Request {
  constructor(useMocks = false) {
    this.mocks = useMocks && {
      '/api/move': {
        status: 'ok',
      }
    }
  }

  async sendInstructions({ speed, grabber, direction }) {
    const url = '/api/move'

    if (this.mocks) {
      return this.mocks[url]
    } else {
      try {
        const req = await fetch('/api/move', {
          method: 'post',
          body: {
            speed,
            grabber,
            direction,
          }
        })
        const body = await req.json()

        console.log(body)
        return body
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const request = new Request(true)
export default request