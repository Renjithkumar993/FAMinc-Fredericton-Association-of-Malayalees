import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Breadcrumbs from '../Breadcrumbs';
import JoinPageModal from '../JoinPageModal'; // Import the JoinPageModal component

const JoinPageWrapper = styled(motion.div)`
    max-width: 800px;
    margin: 50px auto;
    padding: 40px;
    border-radius: 20px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    text-align: center;
`;

const Title = styled(motion.h2)`
    margin-bottom: 20px;
    font-size: 2.5rem;
    color: #ff6341; /* Changed to match the button color */
`;

const Description = styled(motion.p)`
    margin-bottom: 15px;
    font-size: 1.2rem;
    color: #333;
`;

const BenefitsList = styled(motion.ul)`
    list-style-type: none;
    padding-left: 0;
    text-align: left;
    margin-bottom: 20px;
    font-size: 1rem;
    color: #333;

    li {
        margin-bottom: 10px;
        padding: 10px;
        background: #f0f0f0;
        border-radius: 10px;
        display: flex;
        align-items: center;
        
        &:before {
            content: '✔️';
            color: #ff6341;
            margin-right: 10px;
        }
    }
`;

const RegisterButton = styled(motion.button)`
    padding: 5px 20px;
    font-size: 1.2rem;
    background: #ff6341; /* Changed button color */
    color: #fff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 5px 5px 15px #aaa, -5px -5px 15px #fff;
    transition: background 0.3s ease;

    &:hover {
        background: #eb4823; /* Changed hover color */
    }
`;

const JoinPage = () => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <JoinPageWrapper
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Breadcrumbs />
                <Title
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Fredericton Association of Malayalees
                </Title>
                <Description
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Welcome to the Fredericton Association of Malayalees (FAM)! We are a vibrant community of Malayalees residing in Fredericton, dedicated to promoting our rich culture, heritage, and values.
                </Description>
                <Description
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    By becoming a member, you can enjoy numerous benefits including:
                </Description>
                <BenefitsList
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <li>Participate in cultural events and festivals</li>
                    <li>Network with other members of the community</li>
                    <li>Access to community support and resources</li>
                    <li>Opportunities for volunteering and community service</li>
                </BenefitsList>
                <Description
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                >
                    Join us today and be a part of our growing family!
                </Description>
                <RegisterButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShow}
                >
                    Join Now
                </RegisterButton>
            </JoinPageWrapper>
       
            <JoinPageModal open={showModal} handleClose={handleClose} />
        </>
    );
};

export default JoinPage;
