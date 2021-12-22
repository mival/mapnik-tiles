module.exports = class GoogleProjection {

  DEG_TO_RAD = Math.PI/180
  RAD_TO_DEG = 180/Math.PI

  constructor(levels=18) {
    this.Bc = []
    this.Cc = []
    this.zc = []
    this.Ac = []
    this.c = 256

    for (let index = 0; index < levels; index++) {
      const e = this.c/2;
      this.Bc.push(this.c/360.0)
      this.Cc.push(this.c/(2 * Math.PI))
      this.zc.push([e,e])
      this.Ac.push(this.c)
      this.c *= 2
    }
  }

  minmax(a,b,c) {
    a = Math.max(a,b)
    a = Math.min(a,c)
    return a;
  }

  fromLLtoPixel(ll,zoom) {
    const d = this.zc[zoom]
    const e = Math.round(d[0] + ll[0] * this.Bc[zoom])
    const f = minmax(Math.sin(DEG_TO_RAD * ll[1]),-0.9999,0.9999)
    const g = Math.round(d[1] + 0.5*log((1+f)/(1-f))*-this.Cc[zoom])
    return [e,g];
  }

  fromPixelToLL(px,zoom) {
    const e = this.zc[zoom]
    const f = (px[0] - e[0])/this.Bc[zoom]
    const g = (px[1] - e[1])/-this.Cc[zoom]
    const h = this.RAD_TO_DEG * ( 2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI)
    return [f,h];
  }
}