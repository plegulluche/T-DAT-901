import React, { useEffect, useRef, useState } from 'react'
import { websocketConnect } from '../api/websocket/binance.WEBSOCKET.connector';
import { init, dispose } from 'klinecharts'
import Layout from './Layout';
import "../css/Kline.scss";

const style = {
  grid: {
    show: true,
    horizontal: {
      show: true,
      size: 1,
      color: '#393939',
      // 'solid'|'dash'
      style: 'dash',
      dashValue: [2, 2]
    },
    vertical: {
      show: false,
      size: 1,
      color: '#393939',
      // 'solid'|'dash'
      style: 'dash',
      dashValue: [2, 2]
    }
  },
  candle: {
    margin: {
      top: 0.2,
      bottom: 0.1
    },
    // 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
    type: 'candle_solid',
    bar: {
      upColor: '#26A69A',
      downColor: '#EF5350',
      noChangeColor: '#888888'
    },
    area: {
      lineSize: 2,
      lineColor: '#2196F3',
      value: 'close',
      backgroundColor: [{
        offset: 0,
        color: 'rgba(33, 150, 243, 0.01)'
      }, {
        offset: 1,
        color: 'rgba(33, 150, 243, 0.2)'
      }]
    },
    priceMark: {
      show: true,
      high: {
        show: true,
        color: '#D9D9D9',
        textMargin: 5,
        textSize: 10,
        textFamily: 'Helvetica Neue',
        textWeight: 'normal'
      },
      low: {
        show: true,
        color: '#D9D9D9',
        textMargin: 5,
        textSize: 10,
        textFamily: 'Helvetica Neue',
        textWeight: 'normal',
      },
      last: {
        show: true,
        upColor: '#26A69A',
        downColor: '#EF5350',
        noChangeColor: '#888888',
        line: {
          show: true,
          // 'solid'|'dash'
          style: 'dash',
          dashValue: [4, 4],
          size: 1
        },
        text: {
          show: true,
          size: 12,
          paddingLeft: 2,
          paddingTop: 2,
          paddingRight: 2,
          paddingBottom: 2,
          color: '#FFFFFF',
          family: 'Helvetica Neue',
          weight: 'normal',
          borderRadius: 2
        }
      }
    },
    tooltip: {
      // 'always' | 'follow_cross' | 'none'
      showRule: 'always',
      // 'standard' | 'rect'
      showType: 'standard',
      labels: ['T: ', 'O: ', 'C: ', 'H: ', 'L: ', 'V: '],
      values: null,
      defaultValue: 'n/a',
      rect: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 6,
        offsetLeft: 8,
        offsetTop: 8,
        offsetRight: 8,
        borderRadius: 4,
        borderSize: 1,
        borderColor: '#3f4254',
        backgroundColor: 'rgba(17, 17, 17, .3)'
      },
      text: {
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        color: '#D9D9D9',
        marginLeft: 8,
        marginTop: 6,
        marginRight: 8,
        marginBottom: 0
      }
    }
  },
  technicalIndicator: {
    margin: {
      top: 0.2,
      bottom: 0.1
    },
    bar: {
      upColor: '#26A69A',
      downColor: '#EF5350',
      noChangeColor: '#888888'
    },
    line: {
      size: 1,
      colors: ['#FF9600', '#9D65C9', '#2196F3', '#E11D74', '#01C5C4']
    },
    circle: {
      upColor: '#26A69A',
      downColor: '#EF5350',
      noChangeColor: '#888888'
    },
    lastValueMark: {
      show: false,
      text: {
        show: false,
        color: '#ffffff',
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        paddingLeft: 3,
        paddingTop: 2,
        paddingRight: 3,
        paddingBottom: 2,
        borderRadius: 2
      }
    },
    tooltip: {
      // 'always' | 'follow_cross' | 'none'
      showRule: 'always',
      // 'standard' | 'rect'
      showType: 'standard',
      showName: true,
      showParams: true,
      defaultValue: 'n/a',
      text: {
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        color: '#D9D9D9',
        marginTop: 6,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 8
      }
    }
  },
  xAxis: {
    show: true,
    height: null,
    axisLine: {
      show: true,
      color: '#888888',
      size: 1
    },
    tickText: {
      show: true,
      color: '#D9D9D9',
      family: 'Helvetica Neue',
      weight: 'normal',
      size: 12,
      paddingTop: 3,
      paddingBottom: 6
    },
    tickLine: {
      show: true,
      size: 1,
      length: 3,
      color: '#888888'
    }
  },
  yAxis: {
    show: true,
    width: null,
    // 'left' | 'right'
    position: 'right',
    // 'normal' | 'percentage' | 'log'
    type: 'normal',
    inside: false,
    reverse: false,
    axisLine: {
      show: true,
      color: '#888888',
      size: 1
    },
    tickText: {
      show: true,
      color: '#D9D9D9',
      family: 'Helvetica Neue',
      weight: 'normal',
      size: 12,
      paddingLeft: 3,
      paddingRight: 6
    },
    tickLine: {
      show: true,
      size: 1,
      length: 3,
      color: '#888888'
    }
  },
  separator: {
    size: 1,
    color: '#888888',
    fill: true,
    activeBackgroundColor: 'rgba(230, 230, 230, .15)'
  },
  crosshair: {
    show: true,
    horizontal: {
      show: true,
      line: {
        show: true,
        // 'solid'|'dash'
        style: 'dash',
        dashValue: [4, 2],
        size: 1,
        color: '#888888'
      },
      text: {
        show: true,
        color: '#D9D9D9',
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        borderSize: 1,
        borderColor: '#505050',
        borderRadius: 2,
        backgroundColor: '#505050'
      }
    },
    vertical: {
      show: true,
      line: {
        show: true,
        // 'solid'|'dash'
        style: 'dash',
        dashValue: [4, 2],
        size: 1,
        color: '#888888'
      },
      text: {
        show: true,
        color: '#D9D9D9',
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        borderSize: 1,
        borderColor: '#505050',
        borderRadius: 2,
        backgroundColor: '#505050'
      }
    }
  },
  shape: {
    point: {
      backgroundColor: '#2196F3',
      borderColor: '#2196F3',
      borderSize: 1,
      radius: 4,
      activeBackgroundColor: '#2196F3',
      activeBorderColor: '#2196F3',
      activeBorderSize: 1,
      activeRadius: 6
    },
    line: {
      // 'solid'|'dash'
      style: 'solid',
      color: '#2196F3',
      size: 1,
      dashValue: [2, 2]
    },
    polygon: {
      // 'stroke'|'fill'
      style: 'stroke',
      stroke: {
        // 'solid'|'dash'
        style: 'solid',
        size: 1,
        color: '#2196F3',
        dashValue: [2, 2]
      },
      fill: {
        color: 'rgba(33, 150, 243, 0.1)'
      }
    },
    arc: {
      // 'stroke'|'fill'
      style: 'stroke',
      stroke: {
        // 'solid'|'dash'
        style: 'solid',
        size: 1,
        color: '#2196F3',
        dashValue: [2, 2]
      },
      fill: {
        color: '#2196F3'
      }
    },
    text: {
      style: 'fill',
      color: '#2196F3',
      size: 12,
      family: 'Helvetica Neue',
      weight: 'normal',
      offset: [0, 0]
    }
  },
  annotation: {
    // 'top' | 'bottom' | 'point'
    position: 'top',
    offset: [20, 0],
    symbol: {
      // 'diamond' | 'circle' | 'rect' | 'triangle' | 'custom' | 'none'
      type: 'diamond',
      size: 8,
      color: '#2196F3',
      activeSize: 10,
      activeColor: '#FF9600'
    }
  },
  tag: {
    // 'top' | 'bottom' | 'point'
    position: 'point',
    offset: 0,
    line: {
      show: true,
      dashValue: [4, 2],
      size: 1,
      color: '#2196F3'
    },
    text: {
      color: '#FFFFFF',
      backgroundColor: '#2196F3',
      size: 12,
      family: 'Helvetica Neue',
      weight: 'normal',
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 2,
      borderSize: 1,
      borderColor: '#2196F3'
    },
    mark: {
      offset: 0,
      color: '#FFFFFF',
      backgroundColor: '#2196F3',
      size: 12,
      family: 'Helvetica Neue',
      weight: 'normal',
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 2,
      borderSize: 1,
      borderColor: '#2196F3'
    }
  }
}

const types = [
  { key: 'candle_solid', text: 'candle_solid' },
  { key: 'candle_stroke', text: 'candle_stroke' },
  { key: 'candle_up_stroke', text: 'candle_up_stroke' },
  { key: 'candle_down_stroke', text: 'candle_down_stroke' },
  { key: 'ohlc', text: 'OHLC' },
  { key: 'area', text: 'area' }
]

export default function KlineChart(props) {
  const { symbols } = props;
  const [klineData, setKlineData] = useState([]);
  const [rawData, setRawData] = useState([]);

  const chart = useRef();

  useEffect(() => {
    const convertedData = klineData.map(item => {
      return {
        timestamp: item[0],
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5])
      }
    })
    chart.current = init('chart');
    // Create main technical indicator MA
    chart.current.createTechnicalIndicator('MA', false, { id: 'candle_pane' });
    // Create sub technical indicator VOL
    chart.current.createTechnicalIndicator('VOL');
    chart.current.setStyleOptions(style)
    // count number of digits after decimal point in price and volume
    const precisionPrice = convertedData[0]?.open.toString().split('.')[1]?.length;
    chart.current.setPriceVolumePrecision(precisionPrice ?? 2, 2) 
    chart.current.applyNewData(convertedData)

    return () => {
      dispose('chart')
    }
  }, [klineData]);

  useEffect(() => {
    if (rawData.length > 1) {
      // if (JSON.parse(rawData).length > 7) {
      //   const data = JSON.parse(rawData);
      //   let reducedData = new Set(data.map(JSON.stringify));
      //   reducedData = Array.from(reducedData).map(JSON.parse);
      //   let piece = [];
      //   let current = reducedData[0];
      //   let reduced = [];
      //   for (let i = 0; i < reducedData.length; i++) {
      //     if (current[0] === reducedData[i][0]) {
      //       piece.push(reducedData[i]);
      //     } else {
      //       //reduce piece, add together index 5, average others
      //       reduced.push(
      //         piece.reduce((acc, cur) => {
      //           acc[0] = cur[0];
      //           acc[5] = JSON.parse(cur[5]) + JSON.parse(acc[5]);
      //           acc[1] = (JSON.parse(acc[1]) + JSON.parse(cur[1])) / 2;
      //           acc[2] = (JSON.parse(acc[2]) + JSON.parse(cur[2])) / 2;
      //           acc[3] = (JSON.parse(acc[3]) + JSON.parse(cur[3])) / 2;
      //           acc[4] = (JSON.parse(acc[4]) + JSON.parse(cur[4])) / 2;
      //           return acc;
      //         }, current));
      //       current = reducedData[i];
      //     }
      //   }
      //   console.log(reduced);
      //   setKlineData(JSON.parse(rawData));
      // }
      if (JSON.parse(rawData).length > 7) {
        setKlineData(JSON.parse(rawData));
      }
    }
  }, [rawData]);

  useEffect(() => {
    const terminate = websocketConnect(symbols.symbol, '@kline_1m', () => { }, setRawData);
    return () => {
      terminate();
    };
  }, []);

  return (
    <Layout>
      <div id="chart" className='bg-[#3A3A3A] w-full h-[500px] rounded-lg' style={{ height: 500 }} />
      <div
        className="k-line-chart-menu-container">
        {
          types.map(({ key, text }) => {
            return (
              <button
                key={key}
                onClick={_ => {
                  chart.current && chart.current.setStyleOptions({
                    candle: {
                      type: key
                    }
                  })
                }}>
                {text}
              </button>
            )
          })
        }
      </div>
    </Layout>
  )
}