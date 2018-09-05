import benchmarkNames from '../../data/benchmarkNames';
import dataPhantom from '../../data/dataPhantom.json';

export default {
  state: {
    benchmarkNames,
  },
  getters: {
    benchmarks: (state, getters, rootState) => (
      rootState.options.currentCompare === 'time' ?
        dataPhantom.benchmarkDetailsByFeet.filter(
          benchmark => benchmark.name === 'minDrilledHours' && benchmark.startDepth <= getters.maxDepth,
        ).map(benchmark => ({
          ...benchmark,
          value: benchmark.value,
        })) :
        dataPhantom.benchmarkDetailsByFeet.filter(
          benchmark => benchmark.name === 'minDrilledHours' && benchmark.startDepth <= getters.maxDepth,
        ).map(benchmark => ({
          ...benchmark,
          value: (benchmark.value * rootState.options.operatingCost) + rootState.options.fixedCost,
        }))
    ),
  },
};
