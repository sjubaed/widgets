/** @jsx jsx */
/**
  Licensing

  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/
import { React, jsx } from 'jimu-core'
import * as d3 from 'd3'
const { useEffect, useRef } = React

export default function Widget {

  const Circle = () => {
    const ref = useRef()

    useEffect(() => {
      const svgElement = d3.select(ref.current)
      svgElement.append("circle")
        .attr("cx", 150)
        .attr("cy", 70)
        .attr("r", 50)
    }, [])

    return (
      <svg
      ref={ref}
      />
      )
  }


}