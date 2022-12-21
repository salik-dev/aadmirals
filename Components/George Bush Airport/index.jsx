import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./GeorgeBushAirport.module.scss";
import Header from "../Header/Header";
import Fleet from "../fleet/fleet";
import Hero from "../hero/hero";
import Askquestion from "../askquestions/askquestion";
import Footer from "../Footer/Footer";
import Destinations from "../Destinations/Destinations";
import SideNav from "../Header/SideNav/SideNav";
import Testimonial from "../Testimonial/Testimonial";
import Floatingbutton from "../floaingbutton/floatingbutton";
import HomeForm from "../Home Form/HomeForm";
import { Alert } from "reactstrap";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getGeorgeBushPage } from "../../redux/Services/Houston_Airport/George_bush/action";
import Image from "next/image";

function GeorgeBushAirport(props) {
  const dispatch = useDispatch();

  // const cms = useSelector((state) => state.georgeBush);
  // const { george_bush_page } = cms;
  // const data = george_bush_page && george_bush_page.georgeBushAirport[0];
  // const faqs = george_bush_page && george_bush_page.faqs;
  // const fleet = george_bush_page && george_bush_page.fleet;
  // const testimonial = george_bush_page && george_bush_page.testimonial;

  useEffect(() => {
    dispatch(getGeorgeBushPage());
  }, []);
  const cms = props.data1;
  const { george_bush_page } = cms;

  const data = george_bush_page && george_bush_page.georgeBushAirport[0];
  const faqs = george_bush_page && george_bush_page.faqs;
  const fleet = george_bush_page && george_bush_page.fleet;
  const testimonial = george_bush_page && george_bush_page.testimonial;

  return (
    <>
     
      {cms.loading || cms.error ? (
        <Loader />
      ) : (
        <>
          <div style={{ overflow: "hidden" }}>
            <SideNav />
            <Floatingbutton />
            <Header />
            {cms.error ? (
              <Alert className="m-0" color="danger">
                {cms.error}
              </Alert>
            ) : null}
            <div className={styles.mainContainer} fluid>
              <Hero
                Text={data.heroDescription}
                Title={'IAH/George Bush Airport Car & Shuttle Service'}
                img={data?.heroImage}
                Form={HomeForm}
              />
            </div>
            <Container fluid style={{ padding: "100px 0" }}>
              <Container>
                <Row>
                  <Col xl={6} md={6} xs={12} className={styles.discription}>
                    <h6>STRESS-FREE IAH AIRPORT TRANSPORTATION</h6>
                    <span></span>
                    <h2>
                      Get first-class service to and from the airport with
                      AAdmirals
                    </h2>
                    <h6>{data.getFirstClassService}</h6>
                  </Col>
                  {/* <Col xl={1} md={1} xs={0}></Col> */}
                  <Col xl={6} xs={12} className={styles.imageContainer}>
                     <Image priority={true} src={data.getFirstClassServiceImage} alt="STRESS-FREE IAH AIRPORT TRANSPORTATION" layout="responsive" width={200} height={150} quality={100}  objectFit="cover" 
                     className={styles.images} />
                  </Col>
                </Row>
                <Row className={styles.logoContainer}>
                  <Col xs={12} xl={12} md={12} className={styles.heading1}>
                     <Image priority={true} src="/Assets/Group 943.png" alt="AAdmirals Travel & Transportation" width={100} height={70} objectFit="fill"  quality={100}  className={styles.images} />
                    <h2>
                    AAdmirals Travel & Transportation Houston Limo Service
                    </h2>
                    <h6>
                      A Professional Limo & Airport Transfer Serve you in
                      Harmony
                    </h6>
                  </Col>
                </Row>
                <Row className={styles.featuresContainer}>
                  <Col xs={12} xl={4} md={12} >
                    <div className={`${styles.features} main_images_feature`}>
                       <Image priority={true} src="/Assets/Icon awesome-clock.png" alt="clock" objectFit="contain"  width={30} height={30} quality={100}  className={styles.images}  />
                      <h6>
                        {" "}
                        Always on time for your pick-Up, and free of charge wait
                        time
                      </h6>
                    </div>
                  </Col>
                  <Col xs={12} xl={4} md={12}>
                    <div className={`${styles.features} main_images_feature`}>
                       <Image priority={true} width="80" src="/Assets/13-car.png" alt="..1clock" objectFit="contain"  height={30} quality={100}   className={styles.images} />
                      <h6>
                        Private travel solutions in sanitized premium licensed
                        vehicles.
                      </h6>
                    </div>
                  </Col>
                  <Col xs={12} xl={4} md={12}>
                    <div className={`${styles.features} main_images_feature`}>
                       <Image priority={true} width="45" src="/Assets/Layer_5_58_.png" alt="..2clock" objectFit="contain" height={30} quality={100}   className={styles.images} />
                      <h6>All inclusive fair prices with no hidden charges</h6>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} xl={12} md={12}>
                     <Image priority={true} alt="Car Service from IAH Airport" src={data.bannerImage} width={100} height={40} layout="responsive"  quality={100}  className={styles.images} />
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={12}
                    xl={12}
                    md={12}
                    style={{ textAlign: "center", paddingTop: "100px" }}
                  >
                    <h6
                      style={{
                        color: "#020101",
                        fontSize: "31px",
                        fontFamily: "ProximaNovaRegular",
                      }}
                    >
                      AAdmirals Travel & Transportation fleet at IAH Airport
                      area , call for houston Airport car service
                    </h6>
                  </Col>
                  <Col xs={12} xl={12} md={12} style={{ paddingTop: "50px" }}>
                   
                     <Image priority={true} alt="Shuttle from IAH Airport" src={data.IahairportImage} width={100} height={40} layout="responsive"  quality={100}  className={styles.images} />
                  
                  </Col>
                  <Col
                    xs={12}
                    xl={12}
                    md={12}
                    style={{ paddingTop: "50px", textAlign: "center" }}
                  >
                    <h2
                      style={{
                        fontSize: "17px",
                        fontFamily: "ProximaNovaBold",
                      }}
                    >
                      Houston- limo- service- IAH- Airport{" "}
                    </h2>
                    <h6
                      style={{
                        fontSize: "17px",
                        fontFamily: "ProximaNovaLight",
                      }}
                    >
                      {data.iahAirportHeading}
                    </h6>
                  </Col>
                  <Col
                    xs={12}
                    xl={12}
                    md={12}
                    style={{ paddingTop: "20px", textAlign: "center" }}
                  >
                    {/* <h6 style={{ fontSize: "17px", fontFamily: "ProximaNovaLight" }}>
                British Airways, KLM, Qatar Airways, Emirates ANA, and many
                other international airlines deplaning in IAH airport on a daily
                basis. Whether you are going locally to IAH or through one of
                the international airlines AAdmirals Travel& Transportation
                specializes in serving all your airport transportation needs.
              </h6> */}
                  </Col>
                  {/* <Col
              xs={12}
              xl={12}
              md={12}
              style={{ paddingTop: "20px", textAlign: "center" }}
            >
              <h6 style={{ fontSize: "17px", fontFamily: "ProximaNovaLight" }}>
                Our professional chauffeurs are always tracking weather, traffic
                and flight information that may affect your trip, and they
                always ensure that you arrive at your destination safe and on
                time and relaxed.
              </h6>
            </Col> */}
                </Row>
                <Row>
                  <Col xl={6} md={12} xs={12} className={styles.discription1}>
                    <h2 style={{ fontSize: " 32px" }}>Our Fleet</h2>
                    <h6>{data.ourFleet}</h6>
                  </Col>
                  {/* <Col xl={1} md={1} xs={0}></Col> */}
                  <Col xl={6} xs={12} className={styles.imageContainer1}>
                 
                     <Image priority={true} src={data.ourFleetImage} alt="George Bush Limo Service"    width={800} height={590} quality={100}  objectFit="cover"  className={styles.images} />
                  </Col>
                </Row>
                <Row style={{ paddingTop: "47px" }}>
                  <Col xl={6} md={12} xs={12} className={styles.discription1}>
                    <h2 style={{ fontSize: " 27px" }}>
                      IAH Airport useful travel information:-
                    </h2>
                    <h3 style={{ fontFamily: "ProximaNovaBold" }}>
                      Meet and Pick-Up Location Instructions:
                    </h3>
                    <h6>{data.meetAndPickUpLocationInstructions}</h6>
                    <h3 style={{ fontFamily: "ProximaNovaBold" }}>
                      How to Connect to Houston Airport WiFi (IAH)
                    </h3>
                    <h6>{data.howToConnectToHoustonAirport}</h6>
                  </Col>
                  {/* <Col xl={1} md={1} xs={0}></Col> */}
                  <Col xl={6} xs={12} className={styles.imageContainer1}>
                    
                     <Image priority={true} src={data.IahairportinfoImage} alt="George Bush Airport View"    width={800} height={590} quality={100}  objectFit="cover"  className={styles.images} />
                  
                  </Col>
                </Row>
               
              </Container>
            </Container>
            <Destinations />
            <Fleet fleet={fleet} />
            <Testimonial testimonials={testimonial} />
            <Askquestion faqs={faqs} />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default GeorgeBushAirport;
