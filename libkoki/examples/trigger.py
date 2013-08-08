#!/env/python

import subprocess
import os.path
import io
import serial

ser = serial.Serial("/dev/ttyACM0",9600, timeout= 2)

def invoke_subprocess(bufsize):
    #return subprocess.Popen(os.path.join(os.getcwd(), 'realtime_text'), shell=True, stdout=subprocess.PIPE, bufsize=bufsize)
    return subprocess.Popen('./firecontrol_eyeball', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, bufsize=bufsize)

 
def io_open():
    p = invoke_subprocess(1)
    for line in io.open(p.stdout.fileno()):
        yield line.rstrip('\n')



print "start"
ready = True
marker_count = 0
absent_count = 0
reps_required = 5

for line in io_open():
	if not '0' in line:
		marker_count +=1
        if (marker_count >= reps_required) and (ready == True):
            print "Fire!!!"
            # ser.write("1")
            marker_count = 0
            ready = False
        else:
            pass
    elif '0' in line:
        absent_count +=1
        if absent_count >= reps_required:
            print "Reset"
            absent_count = 0
            ready = True

    	

    	
