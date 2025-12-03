// Consolidated data file for all mathematicians
const sampleData = {
  authors: [
    {
      author_id: 1,
      name: "Terence Tao",
      zbmath_author_id: "tao.terence",
      published_as: "Tao, T.",
      external_links: {
        google_scholar: "https://scholar.google.com/citations?user=cIBcPD8AAAAJ",
        mathdb: "https://zbmath.org/authors/tao.terence",
        researchgate: "https://www.researchgate.net/profile/Terence-Tao",
        personal: "https://www.math.ucla.edu/~tao/"
      },
      num_publications: 350,
      num_reviews: 280,
      num_co_authors: 90,
      num_joint_publications: 150,
      metrics: {
        h_index: 110,
        g_index: 220
      },
      publications_by_year: [
        { year: 2015, count: 15 },
        { year: 2016, count: 18 },
        { year: 2017, count: 20 },
        { year: 2018, count: 17 },
        { year: 2019, count: 16 },
        { year: 2020, count: 19 },
        { year: 2021, count: 14 },
        { year: 2022, count: 16 },
        { year: 2023, count: 15 },
        { year: 2024, count: 8 }
      ],
      citations_by_year: [
        { year: 2015, count: 8500 },
        { year: 2016, count: 9200 },
        { year: 2017, count: 10100 },
        { year: 2018, count: 11000 },
        { year: 2019, count: 12300 },
        { year: 2020, count: 13500 },
        { year: 2021, count: 14800 },
        { year: 2022, count: 15900 },
        { year: 2023, count: 16700 },
        { year: 2024, count: 8900 }
      ],
      publications: [
        {
          publication_id: 1,
          title: "The cosmic distance ladder",
          journal_name: "Notices of the American Mathematical Society",
          year: 2020,
          citation_count: 450
        },
        {
          publication_id: 2,
          title: "Finite time blowup for Lagrangian modifications of the three-dimensional Euler equation",
          journal_name: "Annals of PDE",
          year: 2019,
          citation_count: 380
        },
        {
          publication_id: 3,
          title: "Embedding the Heisenberg group in a bounded-dimensional Euclidean space with optimal distortion",
          journal_name: "Discrete Analysis",
          year: 2018,
          citation_count: 320
        },
        {
          publication_id: 4,
          title: "Algebraic combinatorial geometry: the polynomial method in arithmetic combinatorics, incidence combinatorics, and number theory",
          journal_name: "EMS Surveys in Mathematical Sciences",
          year: 2017,
          citation_count: 290
        },
        {
          publication_id: 5,
          title: "The ErdÅ‘s discrepancy problem",
          journal_name: "Discrete Analysis",
          year: 2016,
          citation_count: 260
        }
      ],
      coauthors: [
        { name: "Green, Ben", num_joint_publications: 15 },
        { name: "Ziegler, Tamar", num_joint_publications: 12 },
        { name: "Croot, Ernie", num_joint_publications: 8 },
        { name: "Gowers, Timothy", num_joint_publications: 7 },
        { name: "Kra, Bryna", num_joint_publications: 6 }
      ]
    },
    {
      author_id: 2,
      name: "Noga Alon",
      zbmath_author_id: "alon.noga",
      published_as: "Alon, N.",
      external_links: {
        google_scholar: "https://scholar.google.com/citations?user=aGAPptkAAAAJ",
        mathdb: "https://zbmath.org/authors/alon.noga",
        researchgate: "https://www.researchgate.net/profile/Noga-Alon",
        personal: "https://nogaalon.com/"
      },
      num_publications: 380,
      num_reviews: 310,
      num_co_authors: 120,
      num_joint_publications: 290,
      metrics: {
        h_index: 95,
        g_index: 190
      },
      publications_by_year: [
        { year: 2015, count: 12 },
        { year: 2016, count: 14 },
        { year: 2017, count: 13 },
        { year: 2018, count: 15 },
        { year: 2019, count: 11 },
        { year: 2020, count: 10 },
        { year: 2021, count: 12 },
        { year: 2022, count: 13 },
        { year: 2023, count: 11 },
        { year: 2024, count: 6 }
      ],
      citations_by_year: [
        { year: 2015, count: 5200 },
        { year: 2016, count: 5600 },
        { year: 2017, count: 6100 },
        { year: 2018, count: 6500 },
        { year: 2019, count: 6900 },
        { year: 2020, count: 7300 },
        { year: 2021, count: 7700 },
        { year: 2022, count: 8100 },
        { year: 2023, count: 8400 },
        { year: 2024, count: 4500 }
      ],
      publications: [
        {
          publication_id: 6,
          title: "The probabilistic method",
          journal_name: "Wiley-Interscience Series in Discrete Mathematics and Optimization",
          year: 2016,
          citation_count: 8500
        },
        {
          publication_id: 7,
          title: "Explicit construction of linear sized tolerant networks",
          journal_name: "Discrete Mathematics",
          year: 2018,
          citation_count: 320
        },
        {
          publication_id: 8,
          title: "Solving linear systems through nested dissection",
          journal_name: "2018 IEEE 59th Annual Symposium on Foundations of Computer Science (FOCS)",
          year: 2018,
          citation_count: 280
        },
        {
          publication_id: 9,
          title: "A separation theorem for random graphs",
          journal_name: "Random Structures & Algorithms",
          year: 2019,
          citation_count: 240
        },
        {
          publication_id: 10,
          title: "Testing hereditary properties of ordered graphs and matrices",
          journal_name: "Journal of Computer and System Sciences",
          year: 2020,
          citation_count: 210
        }
      ],
      coauthors: [
        { name: "Spencer, Joel", num_joint_publications: 22 },
        { name: "Krivelevich, Michael", num_joint_publications: 18 },
        { name: "Sudakov, Benny", num_joint_publications: 15 },
        { name: "Yuster, Raphael", num_joint_publications: 12 },
        { name: "Frieze, Alan", num_joint_publications: 10 }
      ]
    },
    {
      author_id: 3,
      name: "Andrew Wiles",
      zbmath_author_id: "wiles.andrew-john",
      published_as: "Wiles, A. J.",
      external_links: {
        google_scholar: "https://scholar.google.com/citations?user=Uz_Lt4EAAAAJ",
        mathdb: "https://zbmath.org/authors/wiles.andrew-john",
        researchgate: "https://www.researchgate.net/scientific-contributions/Andrew-Wiles-2121188909",
        personal: "https://www.maths.ox.ac.uk/people/andrew.wiles"
      },
      num_publications: 45,
      num_reviews: 38,
      num_co_authors: 25,
      num_joint_publications: 30,
      metrics: {
        h_index: 28,
        g_index: 45
      },
      publications_by_year: [
        { year: 1995, count: 2 },
        { year: 2000, count: 1 },
        { year: 2005, count: 2 },
        { year: 2010, count: 1 },
        { year: 2015, count: 1 },
        { year: 2016, count: 1 },
        { year: 2017, count: 1 },
        { year: 2018, count: 1 },
        { year: 2019, count: 1 },
        { year: 2020, count: 1 }
      ],
      citations_by_year: [
        { year: 1995, count: 850 },
        { year: 2000, count: 920 },
        { year: 2005, count: 980 },
        { year: 2010, count: 1050 },
        { year: 2015, count: 1120 },
        { year: 2016, count: 1150 },
        { year: 2017, count: 1180 },
        { year: 2018, count: 1210 },
        { year: 2019, count: 1240 },
        { year: 2020, count: 1270 }
      ],
      publications: [
        {
          publication_id: 11,
          title: "Modular elliptic curves and Fermat's Last Theorem",
          journal_name: "Annals of Mathematics",
          year: 1995,
          citation_count: 2500
        },
        {
          publication_id: 12,
          title: "Ring-theoretic properties of certain Hecke algebras",
          journal_name: "Annals of Mathematics",
          year: 1995,
          citation_count: 1200
        },
        {
          publication_id: 13,
          title: "The Iwasawa conjecture for totally real fields",
          journal_name: "Annals of Mathematics",
          year: 2000,
          citation_count: 450
        }
      ],
      coauthors: [
        { name: "Taylor, Richard", num_joint_publications: 5 },
        { name: "Coates, John", num_joint_publications: 3 },
        { name: "Mazur, Barry", num_joint_publications: 2 }
      ]
    },
    {
      author_id: 4,
      name: "Yunus Ergin Zeytuncu",
      zbmath_author_id: "zeytuncu.yunus-ergyn",
      published_as: "Zeytuncu, Y. E.",
      external_links: {
        google_scholar: "https://scholar.google.com/citations?user=LMNSwU8AAAAJ",
        mathdb: "https://zbmath.org/authors/zeytuncu.yunus-ergyn",
        researchgate: "https://www.researchgate.net/profile/Yunus-Zeytuncu",
        personal: "https://sites.google.com/a/umich.edu/zeytuncu/"
      },
      num_publications: 40,
      num_reviews: 34,
      num_co_authors: 36,
      num_joint_publications: 30,
      metrics: {
        h_index: 12,
        g_index: 18
      },
      publications_by_year: [
        { year: 2015, count: 3 },
        { year: 2016, count: 5 },
        { year: 2017, count: 4 },
        { year: 2018, count: 4 },
        { year: 2019, count: 3 },
        { year: 2020, count: 4 },
        { year: 2021, count: 2 },
        { year: 2022, count: 4 },
        { year: 2023, count: 1 },
        { year: 2024, count: 1 }
      ],
      citations_by_year: [
        { year: 2015, count: 15 },
        { year: 2016, count: 28 },
        { year: 2017, count: 42 },
        { year: 2018, count: 56 },
        { year: 2019, count: 72 },
        { year: 2020, count: 85 },
        { year: 2021, count: 98 },
        { year: 2022, count: 112 },
        { year: 2023, count: 125 },
        { year: 2024, count: 68 }
      ],
      publications: [
        {
          publication_id: 14,
          title: "Lp mapping properties of the Bergman projection on the Hartogs triangle",
          journal_name: "Proceedings of the American Mathematical Society",
          year: 2016,
          citation_count: 55
        },
        {
          publication_id: 15,
          title: "Lp regularity of weighted Bergman projections",
          journal_name: "Transactions of the American Mathematical Society",
          year: 2013,
          citation_count: 48
        },
        {
          publication_id: 16,
          title: "A local weighted Axler-Zheng theorem in Cn",
          journal_name: "Pacific Journal of Mathematics",
          year: 2018,
          citation_count: 9
        },
        {
          publication_id: 17,
          title: "A survey of the Lp regularity of the Bergman projection",
          journal_name: "Complex Analysis and its Synergies",
          year: 2020,
          citation_count: 8
        },
        {
          publication_id: 18,
          title: "Weighted Bergman projections on the Hartogs triangle: exponential decay",
          journal_name: "International Journal of Mathematics",
          year: 2016,
          citation_count: 7
        }
      ],
      coauthors: [
        { name: "Ã‡elik, Mehmet", num_joint_publications: 6 },
        { name: "Kim, Elena", num_joint_publications: 3 },
        { name: "ÅžahutoÄŸlu, SÃ¶nmez", num_joint_publications: 3 },
        { name: "Spinelli, Kamryn", num_joint_publications: 3 },
        { name: "Bansil, Mohit", num_joint_publications: 2 }
      ]
    },
    {
      author_id: 5,
      name: "CÃ©dric Villani",
      zbmath_author_id: "villani.cedric",
      published_as: "Villani, C.",
      external_links: {
        google_scholar: "https://scholar.google.com/citations?user=iGFn5AgAAAAJ",
        mathdb: "https://zbmath.org/authors/villani.cedric",
        researchgate: "https://www.researchgate.net/profile/Cedric-Villani",
        personal: "https://cedricvillani.org/"
      },
      num_publications: 87,
      num_reviews: 65,
      num_co_authors: 42,
      num_joint_publications: 53,
      metrics: {
        h_index: 38,
        g_index: 76
      },
      publications_by_year: [
        { year: 2010, count: 6 },
        { year: 2011, count: 5 },
        { year: 2012, count: 4 },
        { year: 2013, count: 3 },
        { year: 2014, count: 4 },
        { year: 2015, count: 3 },
        { year: 2016, count: 2 },
        { year: 2017, count: 2 },
        { year: 2018, count: 1 },
        { year: 2019, count: 1 }
      ],
      citations_by_year: [
        { year: 2010, count: 320 },
        { year: 2011, count: 380 },
        { year: 2012, count: 450 },
        { year: 2013, count: 520 },
        { year: 2014, count: 580 },
        { year: 2015, count: 630 },
        { year: 2016, count: 680 },
        { year: 2017, count: 720 },
        { year: 2018, count: 750 },
        { year: 2019, count: 780 }
      ],
      publications: [
        {
          publication_id: 19,
          title: "Optimal transport, old and new",
          journal_name: "Grundlehren der mathematischen Wissenschaften",
          year: 2009,
          citation_count: 4500
        },
        {
          publication_id: 20,
          title: "Topics in Optimal Transportation",
          journal_name: "Graduate Studies in Mathematics",
          year: 2003,
          citation_count: 3200
        },
        {
          publication_id: 21,
          title: "Landau damping",
          journal_name: "Acta Mathematica",
          year: 2011,
          citation_count: 650
        },
        {
          publication_id: 22,
          title: "Hypocoercivity",
          journal_name: "Memoirs of the American Mathematical Society",
          year: 2009,
          citation_count: 580
        },
        {
          publication_id: 23,
          title: "A review of mathematical topics in collisional kinetic theory",
          journal_name: "Handbook of Mathematical Fluid Dynamics",
          year: 2002,
          citation_count: 520
        }
      ],
      coauthors: [
        { name: "Otto, Felix", num_joint_publications: 5 },
        { name: "Mouhot, ClÃ©ment", num_joint_publications: 4 },
        { name: "Desvillettes, Laurent", num_joint_publications: 3 },
        { name: "Golse, FranÃ§ois", num_joint_publications: 3 },
        { name: "Guillin, Arnaud", num_joint_publications: 2 }
      ]
    },
    {
      author_id: 6,
      name: "Steven Strogatz",
      zbmath_author_id: "strogatz.steven-h",
      published_as: "Strogatz, S. H.",
      external_links: {
        google_scholar: "https://scholar.google.com/citations?user=FxyRWlcAAAAJ",
        mathdb: "https://zbmath.org/authors/strogatz.steven-h",
        researchgate: "https://www.researchgate.net/profile/Steven-Strogatz",
        personal: "https://www.stevenstrogatz.com/"
      },
      num_publications: 93,
      num_reviews: 72,
      num_co_authors: 58,
      num_joint_publications: 65,
      metrics: {
        h_index: 42,
        g_index: 85
      },
      publications_by_year: [
        { year: 2010, count: 3 },
        { year: 2011, count: 4 },
        { year: 2012, count: 5 },
        { year: 2013, count: 4 },
        { year: 2014, count: 3 },
        { year: 2015, count: 4 },
        { year: 2016, count: 3 },
        { year: 2017, count: 2 },
        { year: 2018, count: 3 },
        { year: 2019, count: 2 }
      ],
      citations_by_year: [
        { year: 2010, count: 850 },
        { year: 2011, count: 920 },
        { year: 2012, count: 980 },
        { year: 2013, count: 1050 },
        { year: 2014, count: 1120 },
        { year: 2015, count: 1180 },
        { year: 2016, count: 1240 },
        { year: 2017, count: 1300 },
        { year: 2018, count: 1350 },
        { year: 2019, count: 1400 }
      ],
      publications: [
        {
          publication_id: 24,
          title: "Collective dynamics of 'small-world' networks",
          journal_name: "Nature",
          year: 1998,
          citation_count: 36500
        },
        {
          publication_id: 25,
          title: "Exploring complex networks",
          journal_name: "Nature",
          year: 2001,
          citation_count: 12800
        },
        {
          publication_id: 26,
          title: "Nonlinear Dynamics and Chaos: With Applications to Physics, Biology, Chemistry, and Engineering",
          journal_name: "CRC Press",
          year: 1994,
          citation_count: 9700
        },
        {
          publication_id: 27,
          title: "Synchronization of pulse-coupled biological oscillators",
          journal_name: "SIAM Journal on Applied Mathematics",
          year: 1990,
          citation_count: 2800
        },
        {
          publication_id: 28,
          title: "Coupled oscillators and biological synchronization",
          journal_name: "Scientific American",
          year: 1993,
          citation_count: 1900
        }
      ],
      coauthors: [
        { name: "Watts, Duncan J.", num_joint_publications: 8 },
        { name: "Mirollo, Renato E.", num_joint_publications: 5 },
        { name: "Abrams, Daniel M.", num_joint_publications: 4 },
        { name: "BarabÃ¡si, Albert-LÃ¡szlÃ³", num_joint_publications: 3 },
        { name: "Kurths, JÃ¼rgen", num_joint_publications: 3 }
      ]
    },
    {
      author_id: 7,
      name: "Zhiwei Yun",
      zbmath_author_id: "yun.zhiwei",
      published_as: "Yun, Z.",
      external_links: {
        google_scholar: "https://scholar.google.com/citations?user=FfSLV1kAAAAJ",
        mathdb: "https://zbmath.org/authors/yun.zhiwei",
        researchgate: "https://www.researchgate.net/profile/Zhiwei-Yun",
        personal: "https://math.mit.edu/~zyun/"
      },
      num_publications: 42,
      num_reviews: 35,
      num_co_authors: 28,
      num_joint_publications: 32,
      metrics: {
        h_index: 18,
        g_index: 32
      },
      publications_by_year: [
        { year: 2010, count: 2 },
        { year: 2011, count: 3 },
        { year: 2012, count: 4 },
        { year: 2013, count: 3 },
        { year: 2014, count: 4 },
        { year: 2015, count: 3 },
        { year: 2016, count: 4 },
        { year: 2017, count: 3 },
        { year: 2018, count: 2 },
        { year: 2019, count: 3 }
      ],
      citations_by_year: [
        { year: 2010, count: 25 },
        { year: 2011, count: 45 },
        { year: 2012, count: 75 },
        { year: 2013, count: 110 },
        { year: 2014, count: 150 },
        { year: 2015, count: 190 },
        { year: 2016, count: 230 },
        { year: 2017, count: 270 },
        { year: 2018, count: 310 },
        { year: 2019, count: 350 }
      ],
      publications: [
        {
          publication_id: 29,
          title: "Global Springer theory",
          journal_name: "Advances in Mathematics",
          year: 2011,
          citation_count: 120
        },
        {
          publication_id: 30,
          title: "Motives with exceptional Galois groups and the inverse Galois problem",
          journal_name: "Inventiones Mathematicae",
          year: 2014,
          citation_count: 85
        },
        {
          publication_id: 31,
          title: "Epipelagic representations and rigid local systems",
          journal_name: "Annals of Mathematics",
          year: 2016,
          citation_count: 75
        },
        {
          publication_id: 32,
          title: "Langlands duality and global Springer theory",
          journal_name: "Compositio Mathematica",
          year: 2013,
          citation_count: 65
        },
        {
          publication_id: 33,
          title: "Quasi-map spaces and grassmannians",
          journal_name: "Quarterly Journal of Mathematics",
          year: 2012,
          citation_count: 55
        }
      ],
      coauthors: [
        { name: "NgÃ´, Bao ChÃ¢u", num_joint_publications: 5 },
        { name: "Heinloth, Jochen", num_joint_publications: 4 },
        { name: "Gross, Benedict H.", num_joint_publications: 3 },
        { name: "Zhang, Wei", num_joint_publications: 3 },
        { name: "Sakellaridis, Yiannis", num_joint_publications: 2 }
      ]
    }
  ]
};
