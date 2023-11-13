export default function Home() {
  return (
    <div className="wrapper bgded overlay" style={{ backgroundImage: 'url("/images/forHome.jpg")' }}>
      <div id="pageintro" className="hoc clear">
        <article>
          <p className="heading">Are you looking for mystery?</p>
          <h2 className="heading">
            <span className="block">... or... </span> for a new fantasy world?
          </h2>
          <footer>
            <a href="/catalog">Seek our library &raquo;</a>
          </footer>
        </article>
      </div>

{/* Recently added books */}
      <div className="wrapper row3">
        <section className="hoc container clear"> 
          <div className="center btmspace-50">
            <h3 className="font-x2 nospace">Recently Added Books</h3>
            <p className="nospace">Tincidunt placerat dui id feugiat duis eu vehicula ipsum id feugiat elit maecenas</p>
          </div>
          <div className="group">
            <article className="one_third first"><a href="#"><img className="btmspace-30" src="images/demo/320x220.png" alt=""/></a>
              <h4 className="nospace btmspace-10 font-x1 uppercase">Tincidunt eget nisi</h4>
              <ul className="nospace btmspace-10 group font-xs">
                <li className="fl_left">
                  <time dateTime="2045-04-06">6<sup>th</sup> April 2045</time>
                </li>
                <li className="fl_right">by <a href="#">Admin</a></li>
              </ul>
              <hr />
              <p>Auctor cursus feugiat sed scelerisque id odio non scelerisque sed ac est rhoncus sodales ante dictum lacinia&hellip;</p>
              <p className="nospace"><a href="#">Read More &raquo;</a></p>
            </article>
            <article className="one_third"><a href="#"><img className="btmspace-30" src="images/demo/320x220.png" alt=""/></a>
              <h4 className="nospace btmspace-10 font-x1 uppercase">Lacinia etiam ornare</h4>
              <ul className="nospace btmspace-10 group font-xs">
                <li className="fl_left">
                  <time dateTime="2045-04-05">5<sup>th</sup> April 2045</time>
                </li>
                <li className="fl_right">by <a href="#">Admin</a></li>
              </ul>
              <hr />
              <p>Morbi tempor ac nibh eu imperdiet diam maecenas in facilisis arcu nec pulvinar risus etiam convallis lacus&hellip;</p>
              <p className="nospace"><a href="#">Read More &raquo;</a></p>
            </article>
            <article className="one_third"><a href="#"><img className="btmspace-30" src="images/demo/320x220.png" alt=""/></a>
              <h4 className="nospace btmspace-10 font-x1 uppercase">Elementum vestibulum</h4>
              <ul className="nospace btmspace-10 group font-xs">
                <li className="fl_left">
                  <time dateTime="2045-04-04">4<sup>th</sup> April 2045</time>
                </li>
                <li className="fl_right">by <a href="#">Admin</a></li>
              </ul>
              <hr />
              <p>Est lectus lacinia enim quis egestas leo urna id ex integer ipsum purus sagittis at eleifend et vestibulum&hellip;</p>
              <p className="nospace"><a href="#">Read More &raquo;</a></p>
            </article>
          </div>
        </section>
      </div>

    </div>

    
  );
}
