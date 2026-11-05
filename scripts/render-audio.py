"""Render the invitation's original melody to a portable PCM file; encode with ffmpeg."""
import math,wave,array
from pathlib import Path
rate=44100; length=24; samples=[0.0]*(rate*length)
notes=[60,64,67,71,69,67,64,62,57,60,64,67,65,64,60,59,53,57,60,64,62,60,57,55,55,59,62,67,65,62,59,62]
for i,note in enumerate(notes):
 f=440*2**((note-69)/12); start=round(i*.75*rate)
 for j in range(round(2.8*rate)):
  t=j/rate; env=min(t/.025,1)*math.exp(-t*2.15)
  samples[(start+j)%len(samples)]+=math.sin(2*math.pi*f*t)*env
peak=max(abs(v) for v in samples)
with wave.open('/tmp/atelier-nocturne.wav','wb') as out:
 out.setparams((1,2,rate,0,'NONE','not compressed'));out.writeframes(array.array('h',(round(v/peak*.42*32767) for v in samples)).tobytes())
