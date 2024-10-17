import Head from "next/head";

import data from "public/data/unsplash.json";
import Page from "@/partials/page/page"
import MasonryLayout from "@/components/masonry-layout/masonry-layout";

export default function Home() {
    return (
        <>
          <Head>
                <title>Photos Masonryfied!</title>
                <meta name="description" content="A masonry layout for photos with Next.js." key="description" />
                <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
            </Head>
            <Page id="index">
              <MasonryLayout data={data} />
            </Page>
        </>
    );
}
