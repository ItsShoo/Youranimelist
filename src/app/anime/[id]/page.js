import { getAnimeResponse } from "@/libs/api-anime"
import VideoPlayer from "@/components/utilities/videoplayer"
import Image from "next/image"
import { authUserSession } from "@/libs/auth-libs"

async function getAnimeIds() {
    const response = await getAnimeResponse(`anime`, ''); // Adjust as needed
    return response.data.map(anime => anime.id);
  }

const Page = async({params:{ id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession()
    return(
        <>
            <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>RANK</h3>
                    <p>{anime.data.rank}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>SCORE</h3>
                    <p>{anime.data.score}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>MEMBER</h3>
                    <p>{anime.data.members}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>EPISODE</h3>
                    <p>{anime.data.episodes}</p>
                </div>
            </div>
            <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2 text-color-primary">
                <Image 
                    src={anime.data.images.webp.image_url} 
                    alt={anime.data.images.jpg.image_url} 
                    width={250} 
                    height={250}
                    className="w-full rounded object-cover"
                    />
                <p className="text-justify text-xl ">{anime.data.synopsis}</p>
            </div>
            <div>
                <VideoPlayer youtubeId={anime.data.trailer.youtube_id}/>
            </div>
        </>
    )
}

export async function generateStaticParams() {
    try {
      const animeIds = await getAnimeIds(); // Fetch all possible anime IDs
  
      return animeIds.map((id) => ({ id }));
    } catch (error) {
      console.error("Error fetching anime IDs:", error);
      return []; // Return empty array to prevent build errors
    }
  }
  

export default Page