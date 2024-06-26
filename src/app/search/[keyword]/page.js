import { getAnimeResponse } from "@/libs/api-anime";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import Image from "next/image";

export async function generateStaticParams() {
  // Define a list of common or important keywords
  const commonKeywords = ['naruto', 'one piece', 'dragon ball', 'attack on titan'];
  
  return commonKeywords.map(keyword => ({
    keyword: encodeURI(keyword)
  }));
}


const Page = async({ params }) => {
    const {keyword} = params


    const decodedKeyword = decodeURI(keyword)
    const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`)

    return (
      <>
        <section>
            <Header title={`Pencarian untuk ${decodedKeyword}`}/>
            <AnimeList api={searchAnime}/>
        </section>
      </>
    )
}

  export default Page