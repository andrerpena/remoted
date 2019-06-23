import * as React from "react";
import "../styles/stats-tags.scss";
import * as Next from "next";
import { getStatsTagsData } from "../server/db/services/stats-tags";
import { EssentialHead } from "../components/EssentialHead";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const ResponsiveTreeMap = require("@nivo/treemap").ResponsiveTreeMap;

interface StatsTagsProps {
  generalTreeMapData: any;
}

const StatsTags = ({ generalTreeMapData }: StatsTagsProps) => {
  return (
    <div>
      <EssentialHead />
      <NavBar hideLogo={false} />
      <div className="container">
        <div style={{ height: 300 }}>
          <ResponsiveTreeMap
            root={generalTreeMapData}
            identity="name"
            value="loc"
            innerPadding={3}
            outerPadding={3}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label="loc"
            labelFormat=".0s"
            labelSkipSize={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
            colors={{ scheme: "nivo" }}
            borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
            animate={false}
            motionStiffness={90}
            motionDamping={11}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

StatsTags.getInitialProps = async ({

}: Next.NextContext): Promise<StatsTagsProps> => {
  return {
    generalTreeMapData: getStatsTagsData()
  };
};

export default StatsTags;
