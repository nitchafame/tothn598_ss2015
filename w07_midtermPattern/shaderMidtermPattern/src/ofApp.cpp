#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    ofBackground(0,0,0);
    ofEnableDepthTest();
    ofBackground(5, 5, 5);
    
    //Sound
    soundStream.listDevices();
    int bufferSize = 256;
    
    
    left.assign(bufferSize, 0.0);
    right.assign(bufferSize, 0.0);
    volHistory.assign(400, 0.0);
    
    bufferCounter	= 0;
    drawCounter		= 0;
    smoothedVol     = 0.0;
    scaledVol		= 0.0;
    
    soundStream.setup(this, 0, 2, 44100, bufferSize, 4);
    
    //Shader
    pattern1shader1.load("patterns.vert", "1patternMidterm_wave.frag");
    pattern1shader2.load("patterns.vert", "1patternMidterm_echo.frag");
    
    pattern2shader2.load("patterns.vert", "2patternMidterm_echoSea.frag");
    pattern2shader1.load("patterns.vert", "2patternMidterm_echoBird.frag");
    
    pattern4shader1.load("patterns.vert", "4patternMidterm_pixStar.frag");
    pattern5shader1.load("patterns.vert", "5patternMidterm_dot.frag");

}

//--------------------------------------------------------------
void ofApp::update(){
    scaledVol = ofMap(smoothedVol, 0.0, 0.17, 0.0, 1.0, true);
    
    //lets record the volume into an array
    volHistory.push_back( scaledVol );
    
    //if we are bigger the the size we want to record - lets drop the oldest value
    if( volHistory.size() >= 400 ){
        volHistory.erase(volHistory.begin(), volHistory.begin()+1);
    }
    
//    float displacementScale = 2+smoothedVol * 100;

    

}

//--------------------------------------------------------------
void ofApp::draw(){
    
    cam.begin();
    
    //shader1 Pattern1
    pattern1shader1.begin();
    pattern1shader1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    pattern1shader1.setUniform1f("u_time", ofGetElapsedTimef());
    
    ofDrawBox(100 * scaledVol+100);

    glPushMatrix();
    glTranslatef(ofGetWidth()*.2, ofGetHeight()*.1, 0);
    
    glRotatef(50,0,0 * scaledVol+100,0);
    ofSetColor(0, 0, 0);
    glPopMatrix();
    
    pattern1shader1.end();
   
    ///////////
    //shader1 Pattern2
    
    pattern1shader2.begin();
    pattern1shader2.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    pattern1shader2.setUniform1f("u_time", ofGetElapsedTimef());
    
    
    glPushMatrix();
    glTranslatef(ofGetWidth()*.2, ofGetHeight()*.1, 0);
    
    glRotatef(40,0,0 ,0* scaledVol+100);
    
    ofSetColor(0, 0, 0);
    ofDrawBox(200 * scaledVol+100);
    
    glPopMatrix();
    
    //ofDrawIcoSphere(100);
    // ofDrawCylinder(50, 300);
    pattern1shader2.end();
    
    ///////////
    //shader2 Pattern1
    pattern2shader2.begin();
    pattern2shader2.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    pattern2shader2.setUniform1f("u_time", ofGetElapsedTimef());
    
    
    glPushMatrix();
    glTranslatef(ofGetWidth()*.2, ofGetHeight()*.1, 0);
    
    glRotatef(30,0,0,0* scaledVol+100);
    
    ofSetColor(0, 0, 0);
    ofDrawIcoSphere(50 * scaledVol+50);
    
    glPopMatrix();
    
    pattern2shader2.end();
    
    ///////////
    //shader2 Pattern2
    
    pattern2shader1.begin();
    pattern2shader1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    pattern2shader1.setUniform1f("u_time", ofGetElapsedTimef());
    
    ofDrawIcoSphere(50 * scaledVol+50);
    
    glPushMatrix();
    glTranslatef(ofGetWidth()*.2, ofGetHeight()*.1, 0);
    
    glRotatef(50,0,0 * scaledVol+100,0);
    ofSetColor(0, 0, 0);
    glPopMatrix();
    
    pattern2shader1.end();
    
    ///////////
    //shader4 Pattern1
    
    pattern4shader1.begin();
    pattern4shader1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight()*25);
    pattern4shader1.setUniform1f("u_time", ofGetElapsedTimef());
    
    ofDrawBox(25 * scaledVol+100);
    
    glPushMatrix();
    glTranslatef(100,200, 0);
    
    glRotatef(-10,0,30 * scaledVol+100,0);
    ofSetColor(0, 0, 0);
    glPopMatrix();
    
    pattern4shader1.end();
    
    ///////////
    //shader4 Pattern1
    
    pattern5shader1.begin();
    pattern5shader1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight()*25);
    pattern5shader1.setUniform1f("u_time", ofGetElapsedTimef());
    
    ofDrawBox(25 * scaledVol+100);
    
    glPushMatrix();
    glTranslatef(100,200, 0);
    
    glRotatef(0,0,30 * scaledVol+100,0);
    ofSetColor(0, 0, 0);
    glPopMatrix();
    
    pattern5shader1.end();
    
    cam.end();
}

//--------------------------------------------------------------

void ofApp::audioIn(float * input, int bufferSize, int nChannels){
    
    float curVol = 0.0;
    
    // samples are "interleaved"
    int numCounted = 0;
    
    //lets go through each sample and calculate the root mean square which is a rough way to calculate volume
    for (int i = 0; i < bufferSize; i++){
        left[i]		= input[i*2]*0.5;
        right[i]	= input[i*2+1]*0.5;
        
        curVol += left[i] * left[i];
        curVol += right[i] * right[i];
        numCounted+=2;
    }
    
    //this is how we get the mean of rms :)
    curVol /= (float)numCounted;
    
    // this is how we get the root of rms :)
    curVol = sqrt( curVol );
    
    smoothedVol *= 0.93;
    smoothedVol += 0.07 * curVol; // zeno
    
    bufferCounter++;
    
}

//--------------------------------------------------------------
void ofApp::keyPressed  (int key){
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){
    
}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){
    
}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){
    
}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){
    
}
