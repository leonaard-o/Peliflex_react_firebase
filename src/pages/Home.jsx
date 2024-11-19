import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import resquests from '../Requests'

const Home = () => {
  return (
    <>
      <Main/>
      <Row rowID='1' title='UpComing' fetchURL={resquests.requestUpcoming} />
      <Row rowID='2' title='Popular' fetchURL={resquests.requestPopular} />
      <Row rowID='3' title='Trending' fetchURL={resquests.requestTrending} />
      <Row rowID='4' title='Top Rated' fetchURL={resquests.requestTopRated} />
      <Row rowID='5' title='Horror' fetchURL={resquests.requestHorror} />
    </>
  
  )}

export default Home