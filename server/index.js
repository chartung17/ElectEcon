const express = require('express');
const bodyParser = require('body-parser');
const countyRoutes = require("./countyRoutes.js");
const mapRoutes = require("./mapRoutes.js");
const trendRoutes = require("./trendRoutes");
const cors = require('cors');
const router = express();

require('dotenv').config()
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || "5000";

router.use(cors())  // all origins
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/********************* ROUTES *********************/

const API_V1 = "/api/v1";

// County page routes
router.get(API_V1 + '/county/counties', countyRoutes.getCounties);
router.get(API_V1 + '/county/elections', countyRoutes.getElections);
router.get(API_V1 + '/county/annual-gdp', countyRoutes.getAnnualGDP);
router.get(API_V1 + '/county/top-industry', countyRoutes.getTopIndustry);
router.get(API_V1 + '/county/growing-industry', countyRoutes.getGrowingIndustry);
router.get(API_V1 + '/county/gdp-growth-percentile', countyRoutes.getGDPGrowthPercentile);
router.get(API_V1 + '/county/state-gdp-rank', countyRoutes.getStateGDPRank);
router.get(API_V1 + '/county/county-voting-for-party', countyRoutes.getCountyVotingForParty);

// Map page routes
router.get(API_V1 + '/map/counties', mapRoutes.getAllCounties);
router.get(API_V1 + '/map/states', mapRoutes.getAllStates);
router.get(API_V1 + '/map/rep-dem-diff', mapRoutes.getRepDemDiff);
router.get(API_V1 + '/map/dem-votes', mapRoutes.getDemVotes);
router.get(API_V1 + '/map/rep-votes', mapRoutes.getRepVotes);
router.get(API_V1 + '/map/other-votes', mapRoutes.getOtherVotes);
router.get(API_V1 + '/map/industries', mapRoutes.getIndustries);
router.get(API_V1 + '/map/non-aggregate-industries', mapRoutes.getNonAggregateIndustries);
router.get(API_V1 + '/map/total-gdp', mapRoutes.getTotalGDP);
router.get(API_V1 + '/map/industry-gdp', mapRoutes.getIndustryGDP);
router.get(API_V1 + '/map/top-industry', mapRoutes.getTopIndustries);

// Trend Page routes
router.get(API_V1 + '/trends/state', trendRoutes.getStates);
router.get(API_V1 + '/trends/state-election', trendRoutes.getStateElectionResults);
router.get(API_V1 + '/trends/national-election', trendRoutes.getNationalElectionResults);


// Put last
router.use((req, res, next) => {
    res.status(404).json(
        {"status": 404, "message": "Resource not found."}
    );
});
router.listen(port, hostname, () => {
    console.log(`Server listening at http://${hostname}:${port}`);
});
