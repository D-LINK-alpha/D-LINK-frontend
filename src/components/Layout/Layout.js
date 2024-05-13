import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types'; // prop-types 라이브러리를 가져옵니다.

Layout.propTypes = {
  title: PropTypes.string, // headerTitle은 문자열이어야 합니다.
  children: PropTypes.node, // children은 React 노드여야 합니다.
};

export default function Layout({ title, children }) {
  return (
    <div>
      <Header title={title} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
