import dataSlope from '../../data/dataSlope.json';

export default {
  slopeData: (state, getters) =>
    dataSlope.filter(slope => slope.well === state.well.currentWell.wellName)
      .map(well => ({
        ...well,
        cumulativeDepth: well.cumulativeDepth + getters.wellData[0].startDepth,
      })),
  splitSlopeData: (state, getters) => {
    const splitArray = [];
    const indexArray = [];
    getters.drillBits.forEach((bit) => {
      const index = getters.slopeData.findIndex(well => well.cumulativeDepth >= bit.depthIn);
      if (index) { indexArray.push(index); }
    });
    indexArray.forEach((wellIndex, arrIndex) => {
      if (arrIndex === 0) {
        splitArray.push(getters.slopeData.slice(0, wellIndex));
      } else {
        splitArray.push(getters.slopeData.slice(indexArray[arrIndex - 1], wellIndex));
      }
      if (arrIndex === indexArray.length - 1) {
        splitArray.push(getters.slopeData.slice(wellIndex));
      }
    });
    return splitArray;
  },
};

