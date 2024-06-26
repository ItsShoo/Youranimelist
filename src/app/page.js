import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-anime";


const Page = async() => {
      const topAnime = await getAnimeResponse("top/anime", "limit=8")
      let recomendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
      recomendedAnime = reproduce(recomendedAnime, 4)

    return (
      <>
        {/* Anime Terpopuler */}
        <section>
            <Header title="Paling Populer" linkTitle="Lihat Semua" linkHref="/populer"/>
            <AnimeList api={topAnime}/>
        </section>
        {/* Anime Rekomendasi */}
        <section>
            <Header title="Rekomendasi" />
            <AnimeList api={recomendedAnime}/>
        </section>
      </>
    );


}


  export default Page
