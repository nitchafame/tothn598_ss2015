#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    ofBackground(0,0,0);
    ofSetVerticalSync(false);
    ofEnableAlphaBlending();

    
    camera.setVerbose(true);
    camera.setDeviceID(0);
    camera.initGrabber(ofGetWidth(), ofGetHeight());
    
    fbo.allocate(ofGetWidth(), ofGetHeight());
    camFbo.allocate(ofGetWidth(), ofGetHeight());
//
//    
//    fbo.begin();
//    ofClear(255, 255, 255,0);
//    fbo.end();
//    maskFbo.allocate(camWidth, camHeight);
    
    //Shader
    face1.load("", "patterns.frag");
    
    //face1.load("", "2skinTrippy_colors.frag");
    
    
    
    

}

//--------------------------------------------------------------
void ofApp::update(){
    
    camFbo.begin();
    camera.update();
    camera.draw(0,0);
    fbo.draw(0, 0, ofGetWidth(), ofGetHeight());
    camFbo.end();
    
    
//    camera.update();
//    ofTexture camTex = camera.getTextureReference();
    fbo.begin();
    //shader1 Pattern1
    face1.begin();

    glBegin(GL_QUADS);
    glColor3f(1.,0.,0.);
    glTexCoord2f(.0,1);
    glVertex3f(0,0,200);

    glColor3f(1.,1.,0.);
    glTexCoord2f(1.,1.);
    glVertex3f(200,0,100);

    glColor3f(0.,1.,0.);
    glTexCoord2f(1.,.0);
    glVertex3f(200,200,100);

    glColor3f(0.,0.,1.);
    glTexCoord2f(.0,.0);
    glVertex3f(0,200,100);
    glEnd();
    
    face1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    face1.setUniform1f("u_time", ofGetElapsedTimef());
    face1.setUniformTexture("u_tex0", camera.getTextureReference(),1);
    face1.end();
    fbo.end();
    
//    fbo.begin();
//    //shader1 Pattern1
//    face1.begin();
//    face1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
//    face1.setUniform1f("u_time", ofGetElapsedTimef());
//    face1.end();
//    fbo.end();

    

}

//--------------------------------------------------------------
void ofApp::draw(){
    
//----------------------------------testest---------------------------
//    if (face1.load("", "patterns.frag") == true) {
//        cout<<"face 1 loaded"<<std::endl;
//        face1.begin();
//        
//        
//        glBegin(GL_QUADS);
//        glColor3f(1.,0.,0.);
//        glTexCoord2f(.0,1);
//        glVertex3f(-100,-100,0);
//        
//        glColor3f(1.,1.,0.);
//        glTexCoord2f(1.,1.);
//        glVertex3f(100,-100,0);
//        
//        glColor3f(0.,1.,0.);
//        glTexCoord2f(1.,.0);
//        glVertex3f(100,100,0);
//        
//        glColor3f(0.,0.,1.);
//        glTexCoord2f(.0,.0);
//        glVertex3f(-100,100,0);
//        glEnd();
//
//        
//        
//        
//        face1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
//        face1.setUniform1f("u_time", ofGetElapsedTimef());
//        face1.end();
//    }
//
//----------------------------------testest---------------------------


//    fbo.begin();
//    //shader1 Pattern1
//    ofClear(255,255,255,255);
//    face1.begin();
//    
//    face1.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
//    face1.setUniform1f("u_time", ofGetElapsedTimef());
//    face1.setUniformTexture("u_tex0", camera.getTextureReference(),1);
//
//    face1.end();
//    camera.draw(0,0);
//    fbo.draw(0,0);
//    fbo.end();
    
    camFbo.draw(0, 0,ofGetWidth(), ofGetHeight());

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
