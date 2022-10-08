import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Head from "next/head"
import Concertcontentstructure from "../../Components/Concert content structure/Concertcontentstructure"
import axios from "axios"
import { URL } from "../../config/serverUrl";
import {NextSeo} from 'next-seo'
function ConcertcontentstructurePage(props) {
  const router = useRouter()
  const {data1} = props;
const {celebrationsTransfer} = data1;
const {concertAndTheaters} = celebrationsTransfer;


  return (
    <>
      <NextSeo
            title={concertAndTheaters[0]?.metaTitle}
            description={concertAndTheaters[0]?.metaDescription}
            canonical={`https://aadmirals.com${router?.pathname}`}
           
            
        />
     <Concertcontentstructure />
    </>
  );
}
export async function getStaticProps ({ query }) {
  let res2 = await axios.get(`${URL}/website-content/concert-and-theaters`);
  // 
  let data2 = res2.data.modifiedResponse
  let data1 = {
    loading: false,
    error: null,
    celebrationsTransfer: data2
  }
  return { props: { data1 } }
}
export default ConcertcontentstructurePage;