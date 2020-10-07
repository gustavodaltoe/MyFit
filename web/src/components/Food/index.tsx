import React from 'react';

import './styles.scss';

const Food = () => {
  return (
    <section id="food">
      <div className="foods">
        <div className="food-details">
          <div>
            <span>Ovo mexido</span>
            <span className="blue">300</span>
          </div>
          <div>
            <b className="gray">Ovo, 3 unidade(s)</b>
            <div>
              <div>
                <b className="gray">C: </b>
                <b className="red">2.4 </b>
              </div>
              <div>
                <b className="gray">P: </b>
                <b className="blue">20</b>
              </div>
              <div>
                <b className="gray">G: </b>
                <b className="yellow">19.5 </b>
              </div>
            </div>
          </div>

          <div>
            <span>Iogurte Grego Light</span>
            <span className="blue">236</span>
          </div>
          <div>
            <b className="gray">Danone, 1 unidade(s)</b>
            <div>
              <div>
                <b className="gray">C: </b>
                <b className="red">2.4 </b>
              </div>
              <div>
                <b className="gray">P: </b>
                <b className="blue">20</b>
              </div>
              <div>
                <b className="gray">G: </b>
                <b className="yellow">19.5 </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Food;
