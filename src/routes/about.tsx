import React, {useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image';

const About = () => {

  return (
    <div className='shadows aboutPage'>
      <Image src='./img/about.jfif' roundedCircle thumbnail className='bio-photo'/>
      <p>Evan Jones is a potter from San Diego, CA</p>
    </div>
  );

}

export default About;


