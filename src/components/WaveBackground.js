import styled from 'styled-components';

const bgImage = `${process.env.PUBLIC_URL}/images/web_bg.png`;

const WaveBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #ff6341, #ffb7a1);
  z-index: -1;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${bgImage});
    background-repeat: repeat;
    background-size: cover;
  }

  &::before {
    top: 0;
    left: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255, 99, 65, 0.7)" fill-opacity="1" d="M0,64L30,64C60,64,120,64,180,69.3C240,75,300,85,360,101.3C420,117,480,139,540,160C600,181,660,203,720,186.7C780,171,840,117,900,117.3C960,117,1020,171,1080,197.3C1140,224,1200,224,1260,213.3C1320,203,1380,181,1410,170.7L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>') no-repeat bottom;
  }

  &::after {
    bottom: 0;
    left: 0;
    transform: rotate(180deg);
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255, 99, 65, 0.7)" fill-opacity="1" d="M0,64L30,64C60,64,120,64,180,69.3C240,75,300,85,360,101.3C420,117,480,139,540,160C600,181,660,203,720,186.7C780,171,840,117,900,117.3C960,117,1020,171,1080,197.3C1140,224,1200,224,1260,213.3C1320,203,1380,181,1410,170.7L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>') no-repeat bottom;
  }
`;

export default WaveBackground;
