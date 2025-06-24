import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        {session ? (
          <>
            <p className="text-30-semibold">
              {query ? `Search results for "${query}"` : 'All Startups'}
            </p>
            <ul className="mt-7 card_grid">
              {posts.length > 0 ? (
                posts.map((post: StartupTypeCard, index: number) => (
                  <StartupCard key={post?._id} post={post} />
                ))
              ) : (
                <p className="no-results">No startups found</p>
              )}
            </ul>
          </>
        ) : (
          <div className="text-center py-20 text-muted-foreground space-y-4">
            <h2 className="text-2xl font-semibold">Join the world of innovators 🚀</h2>
            <p className="text-sm max-w-md mx-auto">
              Please <span className="text-primary font-medium">sign in</span> to explore startup ideas,
              pitch your own, and connect with the community.
            </p>
            {/* Optional login button if you have it */}
            {/* <LoginButton /> */}
          </div>
        )}
      </section>
      <SanityLive />
    </>
  );
}
