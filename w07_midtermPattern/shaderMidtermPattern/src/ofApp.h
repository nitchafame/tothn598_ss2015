
#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{
public:
    void setup();
    void update();
    void draw();
    
    void keyPressed  (int key);
    void keyReleased (int key);
    
    void mouseMoved(int x, int y );
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);
    
    void audioIn(float * input, int bufferSize, int nChannels);
    
    vector <float> left;
    vector <float> right;
    vector <float> volHistory;
    
    int bufferCounter;
    int drawCounter;
    
    float smoothedVol;
    float scaledVol;
    float controlTime;
    
    ofSoundStream soundStream;
    
    
    ofShader pattern1shader1;
    ofShader pattern1shader2;
    
    ofShader pattern2shader1;
    ofShader pattern2shader2;
    
    ofShader pattern2shader3;
    ofShader pattern2shader4;
    
    ofShader pattern4shader1;
    ofShader pattern5shader1;
    
    ofEasyCam cam;
};