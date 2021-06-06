# Run me as:
# python -m distributing.constant_rate.examples.drop_iterations

from ..constant_rate import constant_rate_loop, stoppable
from ...clock.clock import now
from time import sleep

from ...plotting import show

from PIL import Image

def _plot(frame, it):
    global canvas, gif_frames

    # position where to render based in the
    # iteration and in the 'row' assigned outsided
    x, y   = it*fwidth, row*fheight
    x2, y2 = x+fwidth,  y+fheight

    # plot the frame in a common canvas
    canvas.paste(frame, (x, y, x2, y2))

    # plot the frame in the GIF (we plot in the current
    # and next GIF frames, this is to fill the gaps when we drop
    # iterations otherwise the GIF will not render correctly)
    x, y   = 0,         row*fheight
    x2, y2 = x+fwidth,  y+fheight
    gif_frames[it].paste(frame, (x, y, x2, y2))
    if it+1 < len(gif_frames):
        gif_frames[it+1].paste(frame, (x, y, x2, y2))

def fast_plot_sync(it):
    global canvas
    if it >= max_it:
        raise StopIteration

    # pick the frame based in the real iteration
    frame = frames[it % len(frames)]

    _plot(frame, it)

def slow_plot_sync(it):
    global data
    if it >= max_it:
        raise StopIteration

    # pick the frame based in the real iteration
    frame = frames[it % len(frames)]

    _plot(frame, it)
    sleep(rate*1.5)

def slow_plot_no_sync(it):
    global data, myit
    if it >= max_it:
        raise StopIteration

    if it == 0:
        myit = 0

    # pick the frame based in our own iteration counter
    # this function will have a different notion of time
    frame = frames[myit % len(frames)]
    myit += 1

    _plot(frame, it)
    sleep(rate*1.5)


duration = 1000    # milli secs
rate = 1/12
max_it = int((duration // 1000) // rate)    # cnt iterations in 1 secs

# an animation of 12 frames expected to be rendered in 1 seconds
fwidth, fheight = (69, 63)
frames = []
for n in range(23, 35):
    # load
    fname = 'distributing/res/dark_saber/attack/darksaber_attack%04i.png' % n
    img = Image.open(fname)

    # crop it, the orig images are too large
    th = img.crop((600, 10, 945, 325))
    assert (th.width, th.height) == (345, 315)

    # shrink
    th.thumbnail((fwidth, fheight), Image.ANTIALIAS)
    assert (th.width, th.height) == (fwidth, fheight)

    frames.append(th)

nframes = len(frames)
assert nframes == 12

canvas = Image.new('RGBA', (fwidth*nframes, fheight*3))
gif_frames = [Image.new('RGBA', (fwidth, fheight*3)) for _ in range(nframes)]

# Plot the frames of an animation in a loop
# This is a fast plot so no frames are dropped
row = 0
constant_rate_loop(fast_plot_sync, rate)

# Plot the frames of an animation in a loop
# This is a slow plot so some frames are dropped but
# the animation is still in sync so even if there
# are missing frames
row = 1
constant_rate_loop(slow_plot_sync, rate)

# Plot the frames of an animation in a loop
# This is a slow plot so some frames are dropped.
# The plot func keeps its own notion of time so
# it loose the synchornization with the real one
# as soon drops happen.
row = 2
constant_rate_loop(slow_plot_no_sync, rate)

#canvas.show()
canvas.save('bite_frames.png', format='PNG')

# Save the plotted frames in a gif animation, ensure the animation last 1 sec
gif_frames[0].save('bite.gif', format='GIF', transparency=0,
               append_images=gif_frames[1:], save_all=True,
               disposal=0,
               duration=duration/len(gif_frames), loop=0)
