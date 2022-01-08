from sqlalchemy.orm import defaultload
from . import db
from flask_login import UserMixin
from datetime import datetime,timezone 
import pytz
DEFAULT_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAIABJREFUeJztnQmYHEXdxkVAxBMBBQQFgWRmQzgEBA8UUbxB0M94IpdszybcgiIoBhEVQVRAORQVETmWm0BIdnp2CCQLSaZ7pno2CVkSAglJyO5O9WxCIJBk56uaXRRijt3t4+3ueX/P83uQ74OwW/Ov91/d0131pjcRQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYSEwYOFpW/LdsoPZkvuh3Pl6udzovId05FnKCeawr3GFPLGnHBvzTmyta6QWa3puNPUP1MY9KlBB//enfbaP/fff8+9Vf9Z9T9T/9nqvzHw36p+Lt/pHjSlXPmA/lnQ40EIIYTEnqml5W/PFSv7ZcvyGNWEz1QN+Srlvep/W6pJL1G+lHPcWpTUP5P+2eo/o5D36J9ZLxbqv4P6XbhIIIQQQhT5fG0b3RjrV9PC/Y1qmneqpjlLNc1udDMPTrlC/X5Pqt/zDvX3v8qWq99qK/c26bFAfx6EEEKI7zzuVN+TLckjVJM/e/B2+vQoXsXj7h7IV3PCnTP4lcMlZkkeO21u927oz40QQggZMvXv5svup9VV7s9Uo39YX/WiG2xcVeO3XPmQWjRdpMbzUx0di7dHf76EEEJInXznil31Fatq9JfrK3vVqNagG2dSNR25Vt8pqD/gWJIn6ocg0Z8/IYSQBmFqadX7cmX5fdXsb1HNfiG6KVLZpf56c9aR33vMXvledH0QQghJCK2tta3bneohquFfMHiFvx7f9OhGVZ+Nfp1R343JOtWjC4Xatuj6IYQQEiP0lWTOqY4bvMqvwBsbHemCoFc/WKgWcIZZ7N0dXVeEEEIiiP4+2XTc81TDmGkK2Q9vXtTvxcD6nHA71KLunLzo3QNdb4QQQoDkCyt3rl8d6tfy2PQbR/1VwcBnfjZfNySEkAYhO7dvJ/0EuboanFR/qhzdjGhkFgP6jQ50fRJCCPGRyV3925mlyrcH97hfB286NJIOLggfUQuCb7R21t6CrltCCCEjJFvqG11/Pz/R2+vSIDSFlHq/gXypMhZdx4QQQoaAvtrXT/DXT77j9/rUB/WrhfpZER5oRAghEaRNVPYfPLLWRTcMmlDrr4TKP5idvWPQ9U4IIQ2PPmSn/kAfr/ZpiNYfHCzJY2u12lboOUAIIQ2DfkCr/iS/4zroRkAbW7UQKOla5K6DhBASIJO7et9VP1LXcZegg5/S16tPLtRHGeujn9HzhBBCEkO+6O6lAvZq5Sp00FO6WYXbpxapV3K3QUII8YAOUd34ecQujZ1CvqJfI2yzet6PnkeEEBIbBg7j0e/vuy/Bg5xSL6rFa30/Ae4ySAghm6a+Ta9q/Co4V8ODm1J/fVHXNp8RIISQ1zF9Xs87TeFeoEKyGoGgpjQwB55jkZfni+4O6HlHCCEw6q/zCfdH3LyHNpxC9uo3Wvj6ICGk4cg61aNV858DD2JKocr52bI8Bj0fCSEkcPJOT9oU7sP44KU0QuqTKouV/dDzkxBCfGdKZ3XH+rv8A0eu4gOX0oip5sar9TcGCit3Rs9XQgjxTD5f20afpMYjeSkdokJW9PMBra21rdHzlxBCRoRZrB6W4379lI5IfQxxvtM9CD2PCSFkyHR0LN5+4H1+uQ4dopTGWf2Vmf7qbGpp+dvR85oQQjZLuyOPVI2/Cx2clCZKIRfqN2fQ85sQQv4HvbGJfoBJ2Q8PS0oTqJ5bpnBv0Ttmouc7IYTUMUvyWBVQS9EBSWkjWD962KmOQ897QkgDow/tMR33fnQgUtqImkLeqV+vRecAIaTBqO/kx6t+SqHquwHZUuWL6DwghDQAk7v6t6s/4S/kenT4UUr/82zA1fpsDXQ+EEISitnZO0aFTREdeJTSjeq0icr+6JwghCSIWq22ld7NTwXM6giEHB2Gk2ZXav9+tLt23eRltSvvfb52hfIXtz9X9yc3L6r72t/r/5/+Z657ZFn939H/Lvrnp8PTdNyX9C6Ces6ic4MQEnNMZ9UuKlgeQQcb3bT3Pdlbb9oTb1tcM659unbcpfNqnzjfqe1/erGWztie1H+G/rP0n2n8aUH9v3H95OW1+9V/E/17080o5H18XZAQMmLyTvXQnHCfg4cZ/Y9ZIWu3qqtzfcV+4u+76s3Za5MfqYedK2rf+M1T9bsIf5m6vNZWlPDxof/VdNwl7aW+w9E5QgiJGfVb/kK+gg4x6tbufaK33vB1sz3gDO9X9UF5oPrZxqmf8dI7Ftd/ZvS4UVffCVijFvHN6DwhhMSA/KJFb1WhcRM8uBrc2x/rrp1306La5382p9bUgm/uw1X/zF+4eE7t/L8tqt3xeDd8PBtdvYOgPqMDnS+EkIgypVz5gGr+s9Bh1ag+XKjUfn3Xktpxl82LZdPfnHoh87Nbn6s9OIt3BnBKK19090LnDCEkYphl9ygVECvwIdV4/iP3Qv37/AMmRPf2vl/qhwr173qz+p3R496Imo7s4aFChJA6+nUhU8iLeHRvyEEs3Np1Dy+rf6+Pbsoov3LJnPprh/rBRvTn0UjWjxh23PPQ2UMIAaJ3DtPfDaIDqZHUze7XrUtqn/5JGd6Ao6IeC/3Vh14UoT+fRlIt/P9eKNS2RecQISRkHneq78kJ2Y4OoUZSX/Ef/dNOeMONqnohoO8IoD+nhlLIbLYg343OI0JISEwtuR/KCXcuPHwaxL9MfaH2lUvmwhtsXNRj9depfEYgNIUr8qJ3D3QuEUICxixWD1Or/hfgodMATppVqZ12zYLEPdEflt+9cn7t/pl8ayAMTeEua3eqh6DziRASEKbjHp/jfv5hhGn9O+1DzxbwJhp3P3xWqf76IJ8PCKVuV2XL8hh0ThFCfEZN7nN4hG/w/ntad/3pdnTjTJr6awE9tujPN+kOvCFQaUHnFSHEJ3LC/QU6WBpBfdUf5a16467eJ0HfDUB/zo2hvBydW4QQD+h3/NVE/gM+TJLtQ7Mrte/+rgveIBvFb/72Ke4oGIbCvZbHChMSQ1pba1tzT//gveGR5bWP/pDf9YftR89z6icQoj//xCvkDRNrtTej84wQMkT05h6m494GD4+Eq0/oGzMe3wwb1TEtdu1ifiUQhjfrCwp0rhFCtsDA7n7yngiERmLNlmTlhN/N70Q3QDrg8ZfNK7cV+WprkKoLigcmd/Vvh843QsgmeLCw9G2q+U9Fh0USVeP6ck64t/7FXPaNphYrj256dANbbPOmtuXj6ne+hFyDrpckagr3IX1cODrnCCEbkO9c8Q4VftPQIZE01Zh2quZ/9pTO6o5jJszcVTUbB97s6MY17LmjMsXds3P7dhp47dWdg66fpGk6MqcvNNB5RwgZRN+aUxNzCjockmL9at+RrfrY1Neegk5linulDPtpeJOjW1gEWIv2bZ69z2tzQ+9upz7PG9Xn+iK6rhKjkFneCSAkAgye6PcwPBSSoHCf08ekbng4yqjxVpNqLM/DmxsdkqmMvSzVPHv/13+G+aK7Q67snq8+48XwOkuAap7cz5MECQEy+KrfHegwiLvqCrGYK8kTNxZoo8dbB6gr/150U6PD1epOt5TGbvh56lfazJI81nTkk+i6i7/yLr4dQAiA+iY/fM9/xKqm369vZepmsKnNTvStZH01iW9mdEQa1or0aaXRm5pD2ZI8IifcSfVaiEBNxtSbuU8AISEy2PxviMDkj50DYS9bc8XKfpsbY/0wmbqKfAbexKjHRYC9MHWq9f7NfdZtorK/fnWWC4GRzin3an8TjhCySVQD+y160sdSfcUv3IO3NL6jjcLOKcOaA29e1BdTGaszffrMnbb0uedLlbF6cciFwIi8zJ90I4RskpxwL4nAZI+bj2TL1Y8MZXz3PbNrO3XlPwPdtKjPiwDDfmzMuM63DKUG2kt9h6vFYlsE6jZWqsX1Bd7SjRCySdQkOwU9yeOkCqTp7eXKJ4Yzxupq8a/oZkUD0rD+MZxaMIX8pFpwd6DrOC4OPFdT+c7wUo0QskWyZffT6qrkFfQkj4nP66f6h3uSWdoonANvUjTgRUDh9OHUxMCJmtVxajH5bATqOvrqjCq5nxleuhFCNonZ2TvGdKQLn9zRd7U+x1zvijjcMW5qto9OGfZaeIOigao/49EthWE3qIFttt0LlKsiUOfRVshKTvSlhjvGhJANmDa3ezdefQwldNxJ+aK710jGeO+W0vtSGesFdHOiYWl1622dR1IrZrF3dzUfb+GDgltSPjO1tOp9IxljQohiamn529WVfwE/maOrCuN5+rvakY9ybauUYT2Mb0o0VA17iv7sR1o17Y48UjW5+ej6j7TC7ejoWLz9yOcmIQ2K3lwjJ+R98EkcUdXCaG39dr/HPcnThvVDeDOiENXC70wvtaNrr/5WDp/N2YzyLm4URMgwUVe21+Anb1SVM/XmLV7HWG8VqxrBy+hGREEa1ppRGftAr3WUK8sDTSFn4+dFNFWL9Su8jjEhDYMKlO+jJ20UNR33Jf0glh/7jx85Mb9N2rAFvAlRqCnDsnUteK0nfZXb7lQNPiS4cbNCnuR1jAlJPHmneujAcbT4SRsphduRdap7+zXOqYx9Prr50IhoFM7xq67yndV9edDQRl2txuUAv8aZkMQxpbO6o356NgKTNTK+9l2/n0eP7jd+1gfUld8qeOOhkTCVsV5MZYp7+VVf+Xxtm4EdO+U69PyJkmouL8rO7dvilsyENBz1Y0odOQU9SaOkfv3R2xP+GydtWPejmw6NlinDvtfvOsuL3o+q+l2AnkeRUsg2HiFMyAbwgJ8Nla35oruD3+Ocbi5+Bd1saDQd3Wx/ye96m9zV+y69bwB+PkVI4V7i9zgTEltyZffr3FjkP76YE5XvBjLQE2tvVlf/JXSjoZHV0TUSROnpralz9Z0q4fMLr5Dr253KV4IYZ0Jihd4yU02KKnxSRkC1CHraj9f7NkW62T4pAk2GRtjRhnVCUPU3+LogvxJw6s8DuPqByaDGmpDIo/cXzwl3DnoyRsQHswX57qDGWh8FmzbshegGQyOuYS3SR0IHVYePO9X3mMJ9OALzDa5aDBUnd/UHNtaERBrTca9DT0K0A199yMuD3i0snbHOhTcXGgu97hC4JfQJg3o/C30rHD3/4Ap5VZBjTUgkMUvy2Eb/3l/9/tIUFd8fvNqQQ4zCtmoBsATdWGhctJboO0ZB12W2LI9p9FM+6xlYrn4+6LEmJDLoU7LUyvcF9OTDKp9pK/c2hTHeqUzxZHxToXEyyGcBXk+b3TdKP/uCn49AVRaazqpdwhhvQqAM3v57CD7psM1/ZpgTnk/+02Fr2MLLaYHDIV9YubPKhOn4eQl1ss7GMMabEBhqtX92BCYbTiHv1Q8/hjXe+t1ueDOhcfVzYdWpPllQZcOd8PkJ1HSqmbDGm5DQyRUr++kDbdATDTbBhXt12EeDqhB/JAKNhMbQVMZ6KMxa1VfAA1sI4+cqyNV5pycd5pgTEgr1s8Md14nAJAtfIdebjjwj7DEflSnuroJ8HbqR0Ni6bt/TxB5h162+S9i4DwhLq7WzFvgDmISEij4TGz+5wrd+mE9Zfh8x5uoK7qcRaCI0zhrWBYjaNYV7cqMeJmQ67i8RY05IINR3AHPkq+iJFbpCvqKC7BuocVfh/RS8gdBYqxaR88N6GHBD2oU8Ts2hNfB5HPoCQK7Nd7oHIcacEF+pHw3qSAs9qQDNf40OMNS4N7UUPoluHjQhthQ+iqrjnFP5cmM+NyRn8tRAEntUIf8EP5lC98WsUz0aOe4pw/ozvHHQhGhdjazldkceaQp3ZQTmdaiq3/kc5LgT4on6Jh+NtnoXbl/WqXwMO/K1rbjzH/XLlGE/i61ntQgoVz6h5xZ8fofri/miuxd67AkZNvUNfxxpRmAShelqfbWCHvt08+yD0U2DJsvR460D0HWdK1c+rptiBOZ5mD6CHndChk27UzUiMHnCs/7AX/D7+g+FVMa6BN0waMJsti9G17VGf7VmCvkyfL6HqLqQCmVbZkJ8Ydrc7t30QTfoiRPiBH1VLQC+ih7310gbdgHeMGjCtGah6/o19MO1DfVWkZC9+vwU9LgTMiRUwd4BnzShKddly9Vvocf8NfYf77wnbVjr8Q2DJkpVU2N+0Lkjur5fIycq322w44RvRo85IVtEXfl/slF28Rr8PU9Bj/nrSRnWsfBmQRNpU8b+Mrq+X48p3NMaJWvqu4kWq4ehx5yQTaL3uVcTcjZ8soSmvBA95huSzlhXoBsFTarWr9D1vSGmI3+Oz4FwNB33CZ4YSCKLXpGjJ0loCnkTerw3Ripjd+AbBU2iqramoet7Y6i5eAM8D0Iy68jvocebkP9h+ryed6oFwDL0BAmp+bdH8cCOPc7t2D6VsV5BNwqaWF8eM64zcnVfKNS2VXOyDZ4L4fj81NLyt6PHnJA30CiH/ZiO25kvujugx3tjpAzr0Ag0CZpgo7AfwMaY3NX7rpxwBTofQlG4v0CPNyH/IVeu7tMIh3boOxzZTvlB9HhvChXQJ6IbBE2830HX+aYwi727qwX6EnROBJ5DjvsSdwgkkUEV5P3oSRHGpMuW3A+jx3pzpDL25RFoEDTJGvZl6DrfHHmnemhDbBQk5B3osSbkTbmS+xn4ZAjDsvw+eqy3RMqwJ8EbBE20qsbuRdf5llDz9RR4XgSsfv1Rn4+AHmvS4OhXU9CTIfjJ5l6DHuehoK7OFqIbBE22qYw1H13nQyEn3OvRuRGCj6PHmTQw2bI8JgKTIFiF2xHFJ/7/h4m1N6urs7XoBkGTrX7LRJ82iS73LVF/M0A1SHh+BGy7cD+LHmvSgOgNKXJCzkJPgCBVV/7L9YNF6LEeCmMmzNwV3RxoYzjaKOyMrvehMHAmScJfTVYZzM2BSOjkyu7X4cUfZPN35Kt6W2P0OA+VppbSh9GNgTaGqebZ+6PrfajoI4STf3BQJVJbNJOEU9/y13HL+MIPUOH+CD3OwyHdXPwKujHQxjDVUvgCut6Hg1rIXwTPkwBVC5wC7wKQ0MiJynfQRR/shHKntbbWtkaP83BIZ4rN6MZAG8OUYUXqAKwtoS9Y9O6d6FwJOLOOR48zaQB0YzSFOw9d8MFNJOlGebOfTZEyij9CNwbaKFrnout9uORF7x5qEVBB50uAC4CyXuigx5kknKyQJ6GLPUiz5eq30GM8EtLN9sX4xkAbxMidgjkU2kvu/6HzJVir30SPMUkw9VtpjuzCF3owmkL+DT3GI0Xv0BaBxkAbwFTGuhRd7yNFzfOb0TkTWH45biefBSCBkeQn/1XzX6BPNESP8UhJZ6zfoRsDbRAN60p0vY+UfOeKdyT5IoZvBJDAMIU7A1/gASjk+mxJHoEeXy+kMvaf4I2BNoQpw74WXe9eUPP9U3orXXjuBKDpyBx6fEkCyZarH0EXd4D+CT2+XklnrOvQjYE2itZ16Hr3iloE3BCB3AlmEVCsHoYeX5Iw1MrybnRhB+TSfNHdAT2+Xkll7D/gGwNtBFWtXYWud69M7up9V1KPDla/17/R40sSxNSS+6GcI9ehCzsI24U8Dj2+fpAyrF+jGwNtECN+JPBQSepZJupibW1ujtwTPb4kIaii+hO6qAPydvTY+oUK5YnwxkAbQrXY/Bm63v0isXc2hYz9XRoSAaZ0Vnc0hbsKXtD+T5CK6azaBT2+fpE2rAvQjYE2hqlm+zx0vftFvnPFrqaQEp5HPqsye2USvtokYBK7j7Zwm9Fj6ycqmCegGwNtDFMZK4Oudz9pF3ICPI+CWQT8GD22JMbobX9Vo3wOXcj+TwxZjNte/1sinSl8Dd0YaGOYarG+iq53PxnMOYHOJd8V7uKk5RwJEbMkj4UXcQC2O/JI9Nj6Tbql8FF0Y6CNYcqwDkXXu9/kSu5n0LkUSNaVqrE6uZFECFVAD6IL2G/V1f+d6HENgjFG4YPoxkAbw1GZ4u7oeg+CnJD3ofPJ97xz5N3ocSUxZNrc7t3qr5NEoIh9bP4v54vuXuixDYJDjMK2acNaj24ONOGqGjtyYn4bdL0HQdap7q0WAWvQOeXzAmCtznL02JKYkXPkxeji9X8B4Mb2EJOhkDLs5fAGQZOtYS9F13mQqNy7HJ1TAeQeHwYkQ0ef+qdWjovQhevzJFg2tbT87eixDRJ1dZaHNwiaaFMZ20TXeZDoA8HUImAFOq/8VXbxlEAyZLKlyhfxRevzAsCRZ6DHNWhShvVndIOgSde6Gl3nQZN13B+i88pvs2X30+hxJTHBFPIedMH6qnAXT+7q3w49rkGT5l4ANGgNy0DXedDkFy16q8qN5+G55aM8H4AMCb07nrpafhVdsH7a7lQTH1qaVKb4aXiDoIl2dKb4CXSdh4G+Y4jOLV8Vck2+sHJn9LiSiGMK9xx4sfpb+AsLhdq26HENg/TpM3dKZ6x+dJOgCdWw1h94UrEhtpfVdwyTtgma3vEQPa4k4qiV75PoQvXTrJAnocc0TFRIPwVvFDSRpgyrjK7vMNHbhaPzy09Nx52GHlMSYbKd8oOmkP3oQvVP2ZXP1xL5zvKmUCF9E7pR0MR6Pbq+w6S+RbAj5+NzzCeFXG8WexO5iRPxAbXi/RG8SH3UFO7J6DENm1SmeHIEGgVNoKMN6wR0fYdN0u4CtDvyLPSYkohiOrKALlAfXdraWXsLekzDZswEa190o6DJVC0u90LXd9joZwHUhcTyCOSZL6rfZQZ6TEkE0dtgJuz2/0/QY4oinbGWoJsFTZapjP0cuq5RJGlX1HrGz5F7oseURAxVGBehi9NHX8zO7dsJPaYo1ALgOnTDoMkyZdjXousaxZTO6o46UyKQa/4sAhz3PPSYkohhCreELkwf/SN6PJGMbra/hG4YNHF+Dl3XSFSm/CkCueaPQs5CjyeJEDnRl4IXpW/KdblydR/0mCLZ98yu7dIZa2UEmgZNgobdN2ZcZ8M9T/N6ppbcD9WzBZ5v/pjvrO6LHlMSEZJ1+1/ehR7PKKBC+25446CJMJWx70DXcxRI1BbpZfd89HiSiKAK4nF4QfqkWXaPQo9nFFDB/R1046DJMGUUx6HrOQpknerR6HzzLScdmUOPJ4kA+aK7gyqGteiC9EUhF/LYywH2PCn/1lTGctHNg8ZbVUMV/ZUSup6jgM4WU8in4TnnzwLg1cldve9CjykBk3Oq49DF6FtRC/cC9HhGibRh34BuIDTepjL2n9B1HCWS9HVpu5DHoceTgFEF/Xd0IfrS/B25dtrc7t3Q4xkl0i2Fj6IbCI25461D0HUcJfKdK3ZNzGmpQt6AHk8CRN/SUoWwFF6I/iwA7kaPZxRJG/ZceBOhsbTRDv8ZKqbj3o/OO38WAO5i9FgSIPlO9yB4Efpke6n6BfR4RpF0xjoD3UhoPE1lrAy6fqNIu1P5Cjrv/NLs7B2DHk8CQm+Xiy5AX4pYuM9OrNXejB7PKHKIUXibCvMedDOhMdOwVuxxbsf26PqNIvqUQNNxl6Bzz5fs5K6AjYs+HxpdgP4oL0ePZZRRgf5LeEOhcfPn6LqNMjkhr8Lnnh8LAGmix5IAyBbku5PyMEu7U+WDSpth75bS+9KG/VIEmgqNgamMvXq0UdgZXbdRpr3Udzg693xRyDX5zhXvQI8nCZmcU/kyvPh80BRyAXos4wBfCaRDtZEP/hkOOnvQ+eeHeoMj9FiSkFEf/K/QheeTl6HHMg6kTrXer6/s0M2FRlzDfmlUprg7ul7jQM6Rv41A/nlXuJegx5KEjCncR+GF54OmIw9Aj2VcUFd2v4U3GBptDZsL6iGiMvRgdP75swCQWfRYkhApFGrbqg9+NbzwvDf/p9BjGScOPKm4g97aFd5kaCRNGZbcf7zzHnSdxomcI7vQOeg5R4W7Kp+vbYMeSxISZrF6GLrofCrcS9FjGTfShnUButHQaJoyij9C12fcyCXkq1R9NwM9liQkcsI9F11wvhStWsigxzJu6INd1CLgKXSzodFSXf136QOk0PUZN3LlysfROeiP8kz0WJKQ0Nvm4gvOY/N3ZA83/xkZqUzx0+mM1Y9uOjQ6NhnWZ9F1GUf0pkA5ISvoPPSskHegx5KEhCncZfCC81yw7q3ocYwzagHwb3TTodFQXf3/E12PccYU8k54Hnr3efQ4khDIlav7RKDYPJt15PfQYxlnxv7A2UU/9IVuPhTc/DNWRW8Uha7HOKMuqE5G56EvzpF7oseSBIxunPBC86qQ6x+zV74XPZZxRy0ATkE3IIp1tGGdgK7DuFM/IljIfnguetQsVb6NHksSMKYjr0AXmnflTPQ4JoWUYd+ObkIUpdWKrr+koDLJxueixwWAcH+NHkcSMOqDfgRdaJ4V7i/Q45gU6nsDGPaz+GZEw1R95ov5zr9/5BLwOqBaADyEHkcSMEl4ADBbdj+NHsck0dRS+KRqCuvQTYmGpGGtTzfbR6LrLknkytXPo3PRs8JdjB5HEiD5wsqd4UXmUdORa3l6lf+kDXsivDHRUExlrJ+i6y1pTJ/X886cI9eh89Gr2bl9O6HHkgREu3A/iy4wzwo5Cz2OyaS2lVoE3IluTjTo5m/foz9rdLUlEVPIIjwfvefrp9DjSAIiGTsAyj+gxzGpjJnQ+Q61CBDoJkWDav5W8YATSm/meUwLAAAgAElEQVRH11lSUfl6LT4fvWk68gz0OJKAUCvUv6MLzHOBCvcb6HFMMk0TrD3TGasb3ayoz83fsHtHn1b6ELq+kox+jQ6dj97zVd6IHkcSEGp1V0AXmOcCLfbyrPKAGW0UjtDnwqObFvWp+WesF9OG9TF0XSUdnU3ofPScr477BHocSQDoPavVh/sSusC8KZ9Bj2OjoBrH51TTWINuXtRr87dfHd1sfwldT41CTrjP4XPSky/yjJUEku+s7huB4vKk3nMbPY6NhFoAfD3N1wPjq2GtbzKsb6HrqJFQFyl3oXPSs9wSOHmYTvVz8MLyvgC4CD2OjYa6ehzPkwPjqPrMDMtA10+joRYAF6Nz0qvcZyWB5ITbjC4s74Upj0GPYyOSyliZ+uYx8KZGh2T9syo2o+umEWkX8jh0TnpVH26EHkfiM7kEbFWZ7ZQfRI9jo6Iay3f098nw5kY3a8qw16ab7ZPQ9dKoZJ3q3uic9Cy3Wk8epuPeBi8sD5qOdGs1bmCCJN1SOIZvB0RYw1rTZBSPR9dJI6MzSjXQPnReespa4d6CHkfiM6ooO9CF5W0B4E5DjyF505tSzcWj9Bny8GZH36B+z7/JsLiLWwRQDXQGOi89+hh6DInPqKJcHoHCGrnCvRY9hmSAfZtn75MyrDnopkcHm3/Gmp9qESl0XZABVFZdD89LD6qLrSXoMSQ+0tGxeHtTyH50YXkrymoGPY7kv6ROnf7OtGE/gG5+1H5kb6PwbnQ9kP+isvZ0dF56Usj1k7v6t0OPI/GJvNOThheVR7NO9Wj0OJINGNe6dTpjXcHXBBFa/amMffmbJnLTlqhhisqX0Hnp1Ta7bxR6HIlPJKEg9UZG6HEkG6ep2T5aNaNl+KbYIBrWiqaM/WX05042ThIuuPS+MehxJD5hCvc0dEF5Usj1rZ21t6DHkWyafU+x35vKWA/Bm2PCTRlWW7p59m7oz5tsmvyiRW+N+1euylPR40h8IufICyNQUB4WAO5i9BiSoVDbKm0Uzkll7NXoRpk09Zimmu2z9BijP2WyZdRF1zJ4bnpQ/fw/Ro8h8Ql1Bf07dEF5lK+lxAh97Ky6Un0Y3TSToh7LVKa4F/pzJUMn7q9dq4vG36LHkPiE+kBvxhfUyDUd95/oMSTDRzWuY1OGvRjdQOOqGrvl6q8noj9HMnxUZv0bnZueMlfIv6HHkPiEWo1OQheUJ7k1ZWzRr6ilMvZVqpG9jG6oMfJlPWZ8vS++qNy6DJ6bXhYAjns/egyJT8T9dlS7U+WpZjFn39PEHqqp3Vjfqx7fYKNp/RAfq3XU+Fl7oz8v4g3TqbSgc9PTAkC409FjSHwi58gudEF5KkbH/Rp6DIk/jMnYY1IZ6z7uHfB6rX61MLp31HirCf35EH9QDfQb6Nz0uACYhx5D4hOmkBJdUJ4UknucJ4wxE6x9VeO7upEPF1ILoVdU47+l6bTifujPg/iLWXaPguemlwWAI3vQY0h8oLW1trV+jx5dUJ6KsbN3DHocSTCM/YGzi2qEl6qG2INuyCHakzKsX+zdUnofevxJMLSJyv7o3PSmXDexxl0mY89j9sr34ovJ4wLAWbULehxJsOx7Ztd2+q0B/R14KmO/GoEm7bfr1EInq/564h7ndmyPHm8SLG1Wz/vRuenVKZ3VHdHjSDyi93RGF5Kn5i9kf6FQ2xY9jiQ8xkyYuataBJyvtOL9rEB9v34rbVg/1L8TelxJeOjDdNDZ6dlydR/0OBKP5EuVsfBC8rIAcKSLHkOCQ98m11fN9TsDhrUK39S36Mv6Sl81/rP3Gz/rA+jxIzhM4a5E56cX28q9fCg17qgiPBhdSJ4UciF6DBuXaG07e8AJpbePbra/pJrsL9VVdV412hfRDX/gZ7Da9XMMow3ri/pnRI/TG4nWZ9hIqIuXRfD89GC+0z0IPYbEI1mn8jF0IXlbALgCPYaNxsAteOsSfcKfvpKNahM5cmJ+G7Ug+Ij6WTP6jYL6QTmG9XyAt/SXDP43/qg01P8+VP8M6HHYFPrOycBugtbVY4zCB9E/T6NhOm4nPD89aBarh6HHkHik3ZFHogvJUxEKORs9ho3Cf17N23DXPsOeMipT3B398w0VvYPe6PHWAfpuQSpTPFktEH6qfo9rVNO+deAhQ+uhgQfyrBnagVv2+iRDq3Xgn7GvUY3zIv3v1v+M5tn7x2lXPv1mhfrMHnjjnQr7Vf3Kod6HAf3zNQo5R9ro/PSYvZ9EjyHxSK5c/Ty6kLwVoTsDPYZJJ908+2DdHFSjWLeZW91uU4v1ffTPSjZPyiiOU59l72YfTDTsSalm++PonzXpmI77BDo/vZh1qkejx5B4JFuWx6ALyZNCtqPHMKmkW0pj61e9w7sN3po+feZO6J+dvJEDTyruMLiIG87zC1m9+EP/7ElFLQCmwfPTk5Uvo8eQeKS95P4fvpBGrunIKegxTBpNGXtUKmPfMdJX7PT3yvr2+JsmcqMQOOozSBnWKYMnBw7/uQbDWq/+3dv11z/oXyVpqIuXNnR+estebsEee3Ki8h10IXn0QfQYJoV9T7Hfqxr/5Sr01/jyUJxhF0YbhSPQv1ejMvAApN3hz9sM9qv1w5pOtd6P/r2SginchyKQnyNfAJQq30aPIfGIKsKT0YXkqQgdeTd6DOPOIUbhbSrkf6kCfnUAT8b36wfn4vSQYNzRJyuqcf93EJsk6RrRrzTqmkH/nnHHFPIedH56siRPRI8h8YhaAJwGLyRv3o4ewzijmvPXU4b9rP+N/3++T34xZVg/Y+MIjvpCrtm+OIz9DwZqpsBbwB7Q2RWB/Byxunegx5B4JO53AHKObEWPYRwZfKVvctCNYiP26D0E9h/vvAc9Bkkhder0d+r9GPS+DKF/noad46uDI0PfvcTn58jNCnkSegyJR3Ki8l10IXnRdNwH0GMYJ/RVom7Avn3PP2KtlfXNefid8ogZeGZDb8hkucjPcuBwJv1ZTn8nekzihMqvB9H56Sl7+QxA/In7WwDKR9BjGBf0A3kpw34a2/g3vIK01tQ3oOFT5kNG79pXb7iBPLPh6bNcNLql8Bn0+MQFU8ipEcjPkVt2v44eQ+IRsySPhReSB01H5tBjGHUGrvrrT/evhzeJTVs/DldvVKN+Xp7uuCHjWrduaraPjv5xyPUTDm8cM6HzHeghizo5IfPo/PRiu1P5CnoMiUcSsBPgdPQYRpnRmeInUobVhW8MQ/e1/en1dr3o8UOTahEpvXhTi6MX0J/LsOTdgC2SE24HOj+9yJ0AE0C27H4aXUieFHIWegyjiD51TjXSa4N4FSxc9X78xeZG2l1wtFHYWf/Ofr3DD1wE6DtO10TvBMRoYDqyAM9Pb9n7KfQYEo/kypWPwwvJg6ZwS+gxjBr6ylkF7zx4A/DXdQNH/Npnjz6t9CH0GPvNqPGz9k4bhXP075jezJkLMXUe7+b8L6bjltH56cX2Ut/h6DEkHml3qoegC8mbsgs9hlEiZVgt6Q1P60ug+msN5Z9HZ+zj4vhKof6Zm4zi8emMdV3kHswMQsN+SR+RjB73KGEKuQCfnyM3W3I/jB5D4pE2UdkfXUieFLIXPYZRQB9HO/yDexJifb96a04qY/1V73s/KmMfGKUHCfXPon+mgT35rZv0zxr/r2ZGpj5jYt8zn3wX+jOJAqYjXXh+etDs7OX+D3Gnze4bhS4kjwuA9a2tta3R44hENZRD1RXWQnS4R0m1GHhFNRtLLQ7+of7+Qv12QVNL6cNBNh+9CNP/jcEjdy9SP8PN6rOx9c+CHo+IuSA93jokqM8hDuTztW1MIfvh+enBfGeVr+7GnamlVe9DF5LnQiys3Bk9jigGHhZjgxmOg1vlzlNX4e36pDv1v68ffE3yAvX/y+hb1dpUs/1d7X/+fuD/d8HAP2vfMPDvWu36zwpj+91EaVhrmjL2D9DzB4XprNoFnZtezc7ta5gHcxNLElaiOdGXQo9j6Ixr3breiNBBTqkH9Z4BUfq6Jiz07XN4bnrKXN55TQxx/y6qvVz5BHoMw0Q/QJYyrDZ0eFPqh6mMNTWOD3J6Qb9Ch85NjwsAPnuVFEwhn4YXlJcFgJDHoccwLJoy9qh08l7xow2ufhNi1HirCT2/wkJvo4vOTS+qi8an0GNIfEJ9mE+iC8qjp6LHMAxSLYUvqLCsosOa0iCsH2rUXPw8ep6FQU64zRHIzZEvAIQ7Az2GxCfUh/kQuqC8FaP8KXoMgyaVKX4v2nvAU+rdlGGvTbVYiV/Q5xx5MTo3PfogegyJT5iO+88IFJQH5V/RYxgkKcM6M+IH+VDqo/UDhc5Hz7sgUZn1D3xujlx10fV39BgSn8gJeRW6oDwVoyNN9BgGQ20rfd47PpApRWhdrecAehYGQdxPAlSZewV6DIlPqNXcReiC8lSMQi5Aj6Hv6Nf8DOsv+BCmFKeaA/88cmJ+G/R09BtTuM+ic9Nb5roXoMeQ+ITpVDPogvJUjI58NUnvpI4Z1/mWtGHdjw5fSqNgKmPdp+cEel76RaFQ21Zl1lp0bnpSuM3ocSQ+kS3LY+AF5dFsp/wgehz9QG+KwuZP6YZak/c9s2s79Pz0g6xT3Rudl141ReVL6HEkPpEvVcaiC8qzCTibWjd/fbWDD1tKo2fKsB5OwiKgXbifheelR/NOTxo9jsQnppaWvx1dUF41hXsyehw9Uf/Ov74vPTxoKY2qqYx9T9y3DlZZdRo6L71lrezv6Fi8PXociY+YjuxGF5bHorwSPYYjZuCBv9vQ4UppHIz7IkDl1R/Reekta93l6DEkPpMTcha6sDwuAKaix3BETKy9WZ+Rjg5VSuOknjN67qCn70hQWduOzktPCrcDPYbEZ1QDvRNeWJ4WAPFclaYN64/oMKU0pl6Pnr8jIfZ3Wx333+gxJD6Tc+Rv0YXl1amlVe9Dj+NwSGWsn0YgRCmNrXoOoefxcGizet6PzkkfvAw9jsRncqXK+AgUliezTvVo9DgOldGGdYLe8hQdoJTGW6u/KWP/AD2fh0q2VPkiOie9qh9iRI8j8ZkkFGbWcX+IHsehkG4ufkUfeoIPT0oT4bomo3g8el4PBdU8f4zOSa/q1xjR40h8Jif6UujC8sGb0eO4JZqaZx+eytirIxCalCZGPaf03ELP7y2hFgC3RCAnvVmu7oMeR+IzenvKnJCvwIvLg6bjltHjuDnSzbN3SxvW8+iwpDSJpgx7+b6niT3Q83xz5IQ7B52TnjJWyJeTtO06eR1qdVpCF5jH4uyf0lndET2OG2PPk/JvVc1/JjokKU2yqYxtHWIU3oae7xsjO7dvJ51R6Jz0mLGz0eNIAiIRt6ecypfR47gx0ob9N3Q4Utog/gs93zdGTsiv4vPR8wLgb+hxJAGRE+6P0AXmg79Cj+OGqCv/H0YgFCltHNWcQ8/7DUnCq9bqIvEc9DiSgGgvVb+ALjAfCvRR9Di+nqZm+2g+8U9p6K4b3WxH6sQ6lU3T0fnoVb4BkGCmze3eDV1gnhcAjvtSa2ctEmeH7zd+1gdU8++NQBhS2nCmMlZljFGIxDHhk7v6t9MP0KHz0atx22yNDJOcI1egi8zzIqBYPQw9jnqf8nTGakeHIKWNbCpjPxmFg4OyJXkEOhc956pwl6HHkQSM6UgTXWieLbvno8dRXX1cig4/Smn9TsCl6DxQF1YXwnPRq0K2oceRBIxaAPweXmjeCzWLHMMmw/qUCp516OCjlNr6gcD1ak5Cv7s2HXcaPBc9Gusj18nQMIV7MrrQfFgArMl3rngHYvxGG4WdudkPpdEylbFeGPsDZxdEJmQL8t3qwupVeC56tSRPRIwfCZG805OGF5oPmiV5bPijV9tKBc1D6LCjlP6vKcN6WM/RsFOhveT+HzoP/bDN7hsV9tiRkKnValvF/bzq+gLAca8Le+xUwLSgQ45Sumn1HA07F3KO/Cs6D73nqezWvSHssSMA1Af+ILrgPCvcxWGO2ahMcXd19e+iA45SuhkNuy/sVwNVFj0Hz0PPeSrvDXPMCBBTuBfAC84H28q9TWGNmQqWB+DhRindoqmMbYb1VUCbqOyPzkE/NB33vDDGi0SAJLyzGmbRppvtk9ChRikduinDOiWMbEjKxVTWqXwsjPEiESApu1aZjnwy6LEaM2HmrnrHMXSgUUqHZTWMo4NVBhXQOeg9R6OzuyoJCbVynYEuPM+FK2R/vujuFeQ4pQz73giEGaV0+D4YZDZknerecT/+d3ABMC3IcSIRRK1cr0AXnj+LAPfHQY1RuqVwTARCjFI6Qkdn7OOCygfV/C9C559PRu6EVRIw7UIeF4HC874AcGQhiPEZM67zLamMNR8dYJRSDxr2wj1Pyr81iIzICVeg888fK18OYnxIhMnO7dspJ+R6fPH5YLm6j9/jo8LjQnh4UUo9mzKsn/mdDznRl4Lnni/KdY871ff4PT4kBqgPfya+AL2rb8X5OS71d/4NaxU6uCilPmjYLzVNsPb0MyNMR/4cnXv+ZKc73c9xITEiJ9xL0AXoi8IVfo6Lav63wUOLUuqfhn2nnxmhMmcOPPd8yU7p+90REhPyovej8AL0ybxTPdSPMRmdKX4inbH64YFFKfXVVHPxKD8yIkm52e5UD/FjTEgMmVirvTkJ5wJoTSFv9D4ita1U85+FDipKqf+mMrblxw6BKmv+hs47XzJTZb/uAd5zk8QW03FvQxeiPwsAd9X0eT3v9DIW6Uzha+iQopQGp1oEfMNLRuhjyFXWrETnnT8LAPefXsaCJIBcWX4fXYg+LgJOG/FATKy9OW1YJXRAUUqDU7/ae+TE/DYjjQnTqWbQOedbXpYq3x5xXpJk8Ji98r2JeR3QkTNHOg6jDesEdDhRSoM3lSmePNKcSMLWv4NZuU6/Cj7ScSAJwhRyNr4g/THf6R403N//EKOwrQqGBehgopQGb8qwn933zK7thp2TjjwAnW++KdyO4f7+JKGYwr0UXpA+aTrudcP9/dOGZaBDiVIaokbh9OHmRE7IG9D55l9Oyp8P9/cnCUVfNaML0kdX5wsrdx7q717f8tewF8MDiVIamqmMvWw4WwTXd0513BcjkG/+WKzsN7JuQRJJTrhz4UXpl8PY3EJ/H4gOI0opwmLzMPIxGZumOfWHpeeNrEuQxJKkrwFyjlyRX7RoCKv72lZ88p/SxlS/EaDf/tlSSugsURcVL+Bzzbd8vNiPnkESRL5UGYsvTP80y+4PtvQ7N2XsL6NDiFKKs8koHr+lnDCdSgs6z/y0rdzb5E/XIInCdNxOdHH6tgBw5FNb2uVKXf3n0QFEKQVqWJt9dVhnSJK+HjWFLPrbNUhiSMoJV6/Z7lS+sqnfNWVYh8LDh1IKV5//selMdL+GzjF/lRcG0z1I7Mk7PWl8gfrq45v6XVMZ+w508FBKI6Bh3b+pnFAXRU9GIMf8s1zdJ5juQRKBKdwSvEh9tL1U/cKGv+OYCTN3VQuAV+HBQynFa1jrU5niXv+ThSV5LDq//FRv+BZKEyHxRRXJRehC9bXoHVmo1d54AljKsC+Chw6lNDKmMtalr88InRk5IWeh88tXy+754XYTEjtyc+SeyTkbYFAhv/rf37C2lVoAPI0OHEppdNQbA+ktwV9LifaS+3/w3PJVuS4vevdA9BQSM9RV8xR8wfqq89obAWqyfw4dNpTS6Dk6Yx+nM2LwyX8RgdzyT+FOwnYVEhuSt/qt735VPwc8nbFa0UFDKY2eKcN6WGdETlS+i84r/xcAr78LSshmKBRq2yZr5ys9Adw5h5/l7JI2rDXooKGURlDDWv/x88v75Bw5H55X/ro0n69tg+4rJEaoSXB5BArXV0+5pusWeMhQSiPriVd13YPOqQC8DN1PSMzIOtW9TSH7I1C8vjlpVq9syti96JChlEZRa9W9T3RLdE75aT3D+e4/GQk5IdvRBey34/+8MIcPGkpp1Dzt2gUz0Pnku0K2ofsIiSk5UfkOvIB9tk1U1u4/3p6PDhtKaXQcO8FePKUo16LzyX+r49B9hMSU1s7aW0xHduOL2F+vum9JAR04lNLo+KvWxRY6l/xWZXfP5K7+7dB9hMSYJD4MqP3E+c5j6NChlOL92HlOAZ1HgSwAhPtrdP8gMafN6nl/TshX0MXst/c80f1cqsWuosOHUoozlbFX3z6t+zl0HvmukGumze3eDd0/SAJQBXUzvKAD0Lj26Sw6gCilOH9wzdPT0DkU0ALgJnTfIAkhX6qMTdorgdqskGsPPKNYRocQpTR8Dzij9HRbqbIOnUN+W8/qYmU/dN8gCUIV1VR0YQfhTVOXz+fRwJQ2linDXnvDlOVPofMnmAWA+xC6X5CEkStXP48u7KAcd/k8fhVAaQM57jdPPYrOncAWAGX3KHS/IAnEFLKILu4gbBPypbET+FUApY3g2PHFBY/YlZfRuRNI83dkAd0nSELJleSJ6AIPyr+0Lbf4VQClyVbf+r/+4eXJOur39YrKd9F9giQUvTGQKrLn4UUekN+5Yr6JDihKaXB++7dPJfOpf6f+3f+zPPWPBEq7I89CF3pQ6rcCPnxW0UaHFKXUfw88ozh3aqnyKjpnAlsAOJUWdH8gCUdvLZkT7mJ0sQflnY93P5vOWC46rCil/pnKWKv/lV/xLDpfAmv+6upf36FF9wfSAOiVJrrgg/Qn/3y2HR1YlFL/PP+mZ5J30t8bPRXdF0iDUCjUts0JuTACRR+YR13U+Sg6tCil3v3Uj8uPo/MkSE0hn+Z3/yRUTOGejC78IJ1s9bpjJ9hz0eFFKR25+02wFk0qVPrQeRLoAsCRJ6D7AWkwWltrW6tFwDx08Qfpv/IvzE8b9kp0iFFKh6/+3v9m84Wn0TkSrHK+zmJ0PyANiH7nFD8BgvWn/1o0HR1klNLhe8HNi55E50fwVseh+wBpUCbWam/OCTe5m2oMeuylc/PoMKOUDt2vXjo30d/7a03HLesMRvcB0sDkyu7X0RMhaNtE5dWPnFN6Ah1qlNIte/DZJUvN2bXo3AhcIb+Kzn9C9AOBiT1Y4zUfnFl5YUyL9Qw63Cilm1bN0SX3P9nTjc6LoDUdaaJzn5A6ubI8MOfIxJ2rvaE3516Y05Sx+9AhRyn9X1MZ68W/ZV9I9IPJA8p1baKyPzr3CfkPakX6F/zECN7f3PX8LH2gCDrsKKVvcN1ldy5ugIf+6v4JnfeEvIGppVXvU4VZjcDkCNxz/rJwWgQCj1I66PjrFiT2kJ/Xawop84WVO6PznpD/IVd2z0dPkLA8/rK5OXToUUrt2tcum5f4Z5BeUx/Ghs55QjbKwHHBcj56koShWZLrP/lj53F0+FHayB5xgTNDz0V0HoSicOfqbdjROU/IJlGT8Vj4RAnJtpJczdcDKcV46Fkla4otX0bnQFhmS5UvovOdkC1iCjkVPVnC8pFCZeVBZwgbHYaUNpIHnVHqfLhQWYWe/2FpCvchdK4TMiTa7L5RpuO+hJ40YTlpVm/1gNOL89ChSGkjuP94++kHZ/ZK9LwP0dW5cnUfdK4TMmRyjrwwAhMnNO99ortnvwn2InQ4Uppk92spPnt3R+8K9HwPU3UxdR46zwkZFvp8arUIsNCTJ9RFQEfvsrEtxafRIUlpEh0z3l7UOqNnCXqeh9r8hSzqLEXnOSHDpt2pHmI6Mvl7cr/Oezp6Fu03nosASv1Ub/F7+2Pdz6Hnd6jNX2VnvtM9CJ3jhIwYtYK9Ej2RwrZ1es8SfasSHZqUJsExLfbzjdb86wsA4f4and+EeOLBwtK3qUXAAvRkCtu7ZvR0j51QXIgOT0rj7P7jiwvUXFqOns/hK7s6OhZvj85vQjxjlt2j1CKgHz+pwvWBJ3t7Djyz5KBDlNI4qt+sue+Jnl70PA5bnZXtwv0sOrcJ8Q1V1H9HTyyED1u91UPOKhXQYUppnDzozFJx0uyGetXvvwsAR/4FndeE+Eq+6O6QE27DfY+nnVyorDqcOwZSOiQPO1c8+YglG2aTnw2a/6JsQb4bndeE+E62JI/QZ1mjJxnCNlFZ+6WJcx5FhyulUfboizofU3PlVfR8hSjk+nZHHonOaUICQxX6r+ATDWjztQumpTNWPzpoKY2WVv+3r3iqYU712/gCwL0Enc+EBIre1MJ03Cfgkw3oBf9YNDOVsV7Bhy6lePVcuOAfz8xAz0ts85ezeNIfaQj0vtamcFfCJx3QayctE+qqpxsdvpSCrfz+gaVF9HxEqrJwlT4/BZ3LhISGKvxT0RMPbev03q6xp5c6IxDClIbu2AnF+bc/1r0QPQ/hluSJ6DwmJHRyQt4Bn3xg9ZGmHz9fzESHMaVh+rHznScetip96PmH1nTk3egcJgTClM7qjqbjNtThHhszW5L9p12zoC1l2GvRwUxpwK773u/mTdc1j553cIX7nH49Gp3DhMBoL/UdnhNyDXwyRsA/3r+02JSxV0QgpCkNQKtyxd1LGuqE0E2qMi9brn4Enb+EwMmVKuPhEzIi3jm9e8mBZ5QEPqwp9c+DziyJu6b3PI+eX5FRuM3o3CUkMphC/g0+KSOi3ghFvxOtgnMdOrgp9abVf8wv5k5rs+Ur6HkVFU3h3oLOW0IiRX7RoreajiygJ2eUvOq+pXZTxl6OD3FKh29Ti9V9+T1LZqPnUZRUFzpFnvJHyEbIzZF7qkVAD3qSRsn7Z/ZUjzjf4WFCNFbqN1semNVbQc+fSClkZWrJ/RA6ZwmJLPoYzEY9L2BzXnTLs3oLYYkOdko3q2H1nX79whx6vkROvc9/qfoFdL4SEnlMIX8Kn7AR9K7p3YsOP1d0wEOe0o142Lli9p3TVzTkiZ9b0hTuBehcJSQW1Gq1rfQGGehJG0X1+9Nn37hwelPG7kMHPqV1W+zquX99Zgbf7d+46oLmTp1p6FwlJDboB2Vywu1AT96oeu8TPd2f+UnndHj404b2oz8Us+6c3rMcPV3JRokAAAx6SURBVB+iq5z5YGHp29B5SkjsyBdW7qxWz0/jJ3F0/VXrklljWqwl6EZAG8umjLX8kn8/19Cnem5RIRdOLa16HzpHCYkteacnrZ+ehU/mCDu5IF/85m/mPZ42rDXoxkATrqqxr/1qXnby7EpDn+a5RYXszZb6RqPzk5DYYwr5SW4XvGVve3TFsiN/4vBgIRqI+nb/rY+uWIyu88gr5Ctm2T0KnZuEJIZsufottRDgQ0ZD8Iq7ny+NnWAvRDcMmgzHnm4/fcW93NBnKOqMMh15AjovCUkcOUdejJ7gcVEF0bqf3PxsW1OLvRjdQGg8HdNiLzvrxgWPZUWF+3IMWfkTdE4Sklh4ZsDwbCu6qydc9/TUpozdi24oNC5a8pQ/dD32SFG+hK7fWCnkDeh8JCTRtLbWtlaT7Xb4ZI+Zk2ZVVn/vyvncP4Bu2ha7qg+hemgWH/AbrnrfEp1N6HwkJPEUCrVtc8KdhJ70cfSh2b2rTv7D/EfVVZ4Lbzg0EqYy1qqv/3reow/O6q2i6zOOmo77gM4kdC4S0jC0dtbeoibfI+jJH1cnqau8k3/f1dGUsbrRDYhibMrYK75/VZc5aXavRNdjbBUyq08yRechIQ2H3mFLTcLH4CEQY/U57T/++6LpYycUF6AbEg3H/VqKzzZfu2DaI3blZXT9xVrhduQ7V7wDnYOENCzZgny3KSRfUfKoKdzar+9aMvcjPyyV0hmrH92kqN9a/YecXZp12Z3PzeKe/X7MF1l83Km+B51/hDQ89S2DHbcTHQpJ8dZHVyzU3wmrxlHBNy7qRf3Q5+d/3vnYP7IvPIWuq6Sosqacndu3Ezr3CCGDTJvbvZvpSIacjz5iVV4+72/PPHHwmcUyupHR4Wj1f/isknO++ux4m99fTeHOy3eu2BWdd4SQDTCdVbvkhCvQIZFE75zevfB7V3Y93DTefg7f4OjGVFf7y/Wdm1unrViErpckqpp/iYf7EBJh8kV3B9NxeUpZQGZLlfW/v39p+Ys/7+xIG7ZEN71GV2/w9LmfdeavvPf5J7JCrkXXR1LVzxnxtj8hMWBqafnbTUfm0KGRdNuKlfW/vWfJnC/8fO6TXAyEauXoizqnXX734ifbRIVNP2DVBcW0yV2970LnGiFkiOhXBNWqfSo6PBpF1YhevX7K8lnf/O1TbQdMKM6JQJNMlGPHF5cc98u503937/OlqSU2/RCd3NGxeHt0nhFChoneLEgtAu6JQIg0nLdN6+454/oFs474kTOL2w8P31SLXf34+eLJCdctmKGPeUZ/no2o3uFvclf/dugcI4SMkHy+to2ayLehw6SR1XcH/vTwMnHiVU89dvgPHUstCFaiG2zU1IskPTYnXtX12HUPLXV4ax+rKdxbdHag84sQ4hF9SIea0FejQ4UOqDei+Ye5YuGZNyyc/pkLyx37TSguTBvWenQTDtF1Y9Xv/JkLO2ecdePC6X83X3hGb8SE/lzooEJeNbFWezM6twghPmIKeXbOkTzbPII+Uqi88ueHli0664YFM780cc6sg88W8xPx1UGLXT3wrNKcz1885/EJ1y3I/+mhZeLh2ZUX0eNNN6ZcZzryDHROEUICol3I49RkX40PGzoU7+noXvq7+5dY+m7B8ZfNnfGpHzkzDzqzOG9Mi90Lb+6Dqp+lR/9Mn/yRM+trl82dfsb1C2dcdd9S++6OHn53HxNN4a7KluUx6HwihARMtlz9SE7IF9ChQ72pd7m7Jd+98JpJS8Ultz0386wbFs444cqux4/5xdwZ+vb6x853njj07JJ14OmluftPsJ/bb7y9RDXrxU0Z/cqiPg75vza12BX9/9P/jP5n9b+j/139Z+g/S/+ZJ/xu/vQzr1/Y8Yvbn5up/5v6v82d9uKvav7LlAejc4kQEhL5ortXTrhz0OFDKcVZP0NkjtwTnUeEkJDRuwbmhGxHhxClNHxNR5r6NFF0DhFCQOi9AtQi4CZ0GFFKQ1TIGwqF2rbo/CGERIBcSZ5oOu5L8GCilAankGtM4Z6GzhtCSMTQDwKZjlwEDylKqe+qBf4Ss1g9DJ0zhJCIki+s3FldJWTRYUUp9VEh8/q4cHS+EEIijt45MOfIy00h++HBRSkdsXoO611Aua0vIWRYDG4aVEWHGKV0+KrGv1L5DXSOEEJiitnZO0aFiYMOM0rpcJR2TvSl0PlBCIk5+khQ/ZVATsj1+GCjlG7K12758xhfQoivZJ3q0SpklqJDjlK6EYV8wRSVL6FzghCSUPRbAqbj3g8PO0rpfxXy3uzcvp3Q+UAIaQD0xkEqeHisK6VA9eZd+phvdB4QQhqMtnJvU/1howgEIaWNpmr8s7OlvtHoHCCENCj6/WJTuBeoMOKxsJSGYH3LbuFeos/xQM9/Qgh5U65c3cd0ZA4djpQm3MfyTk8aPd8JIeQN1Gq1rerPBghZiUBQUpokq/q7/om12pvR85wQQjZJvnPFrjlH3hWB0KQ0/gp3Ul707oGe14QQMmTMkjxWn0AGD1BKY6gp3OXcypcQElvyRXcH05G/V76KDlRKY6GQr6j5csXkrt53oecvIYR4ps3uG5VzZCs8XCmNskJm9fkb6PlKCCG+o7cTNh23DA9aSiOkuuJ/KudUvoyen4QQEih674B2p2qo0OtBBy+lSE0hpd5Hg+/0E0IaCn2uQE6416uFwFp0EFMapvWaF+61UzqrO6LnISGEwJhacj+kroRuzDlyHTqYKQ3U+pHaspVb+BJCyOvQDz+Zwr1lICQjENaU+qRa4Pbr9/lzZXkgep4RQkhkyZcqY/VVUj00IxDelHpSP9kv3IPR84oQQmKDWaweVr9qQgc4pSNRNf5sufoR9DwihJDY0l6ufEIF6oP8aoBGXl2jQt6XdSofQ88bQghJDPUTB4V7tQra1fCgp/T1CrlGP7/SVu5tQs8TQghJLI/ZK9+rz0PnPgIU7UANysvbrJ73o+cFIYQ0DJO7+rfTxw+rK6956EZAG0whF+rjeR8sLH0beh4QQkjDos9INx33eBXMk/mcAA1OuU4tNh9uF/I4XXPouieEEPI69K1YvbWq6chF+IZBE+Lz+jZ/vujuha5vQgghW0BfoemDh+r7CfAoYjps5Tr9Gl/OqY7TZ1eg65kQQsgImDa3ezcV6BeaQi7ANxYabWWXvoOU71yxK7puCSGE+EiuWNmv/gYBFwP0NYW7WL9emi3JI2q12lboGiWEEBIw9cWAIy9XTWApvAnRsH2eTZ8QQhqc+vMCqhHohqBcFoHmRINQyF69WY9Zkse2tta2RtcdIYSQCKEXA+1O9RD9PXD9EBd9bju6cdGRNvz16vMr6Ls8+oFQPsxHCCFkyOQLK3fWT4KbQt7IuwPRd3Bnvla1iDP0w5/o+iGEEJIA6hsOFauHqSYzUS0Gpuv939ENr9FVC7OX1V8fV5/Jz/XJe9yghxBCSODoW8oDXxfIswf3G+hGN8TEK9y++vv5wr2kflt/0aK3ouuAEEJIg6OfJtenwZll9wdqQfAP5Xx4w4yxamHVrxZVT6m//l39/al5pyeN/owJIYSQITF9Xs879V2CwUOLrh58sJCnGG6ourLXD+zVn9IX8uz61X1h5c7oz48QQgjxFb2vvFoMfFU1u58q71TO1q+pwRtx0Ff1avEz+Lveof56kX4lj3vsE0IIaXj0HQPVJA8YXBycrZrmH03HfUBdIQt1dbwS3cCHciVf/1kd9/76z65/B/W7tInK/vp3Q48vIYQQEkv0Q29msXd3vUgwy+5ROaf6zXYhJ+QcebFuuKr5/is3cCxytn5Lva5b1ufXD9qrmrJUi4lV/7kqV/9b/9/qdyAG/zn977z27w8ciqP/zPqfrf4b8me5UmV8/fVI9TPUfxb1M/GBPEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhITF/wMKhaN50EEZ5wAAAABJRU5ErkJggg=="




class Contacts(db.Model):
    id              = db.Column(db.Integer,primary_key=True)
    name            = db.Column(db.String)
    address         = db.Column(db.String)
    phone           = db.Column(db.String)
    facebook        = db.Column(db.String)
    zalo            = db.Column(db.String)
    telegram        = db.Column(db.String)
    note            = db.Column(db.String)
    color           = db.Column(db.String,default='#000')
    image           = db.Column(db.String,default=DEFAULT_IMG_DATA)
    create_time     = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    username        = db.Column(db.String,db.ForeignKey('users.username'))

    def serialize(self):
        return {
            'id'       : self.id,
            'name'     : self.name,
            'address'  : self.address,
            'phone'    : self.phone,
            'address'  : self.address,
            'facebook' : self.facebook,
            'zalo'     : self.zalo,
            'telegram' : self.telegram,
            'image'    :self.image,
            'username' : self.username,
            'create_time': self.create_time
        }
class Styles(db.Model):
    id            = db.Column(db.Integer,primary_key=True)
    color_default = db.Column(db.JSON,default=['#ab68ca', '#3a58f0', '#d62f45', '#2ebf5e', '#fcba03'])
    length        = db.Column(db.String,default='80')
    username      = db.Column(db.String,db.ForeignKey('users.username')) 

    def serialize(self):
        return {
            'id' : self.id,
            'color_default' :self.color_default,
            'length' : self.length
            }
class Avartar(db.Model) :
    id           = db.Column(db.Integer(), primary_key=True)
    image_name   = db.Column(db.String, nullable=False,default='user image')
    image_data   = db.Column(db.LargeBinary)
    image_base64 = db.Column(db.String, nullable=False,default=DEFAULT_IMG_DATA)
    content_type = db.Column(db.String, nullable=False,default="image/jpeg")
    image_date   = db.Column(db.DateTime, nullable=False, default=datetime.utcnow().astimezone(pytz.timezone("Asia/Ho_Chi_Minh")))
    username         = db.Column(db.String,db.ForeignKey('users.username')) 


class Users(db.Model,UserMixin):
	id          = db.Column(db.Integer(), primary_key=True)
	username    = db.Column(db.String,unique=True)
	name        = db.Column(db.String, nullable=False)
	pass_word   = db.Column(db.String,default='123456')
	create_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow().astimezone(pytz.timezone("Asia/Ho_Chi_Minh")))
	avartar     = db.relationship('Avartar',backref='users',lazy='dynamic')
	contacts    = db.relationship('Contacts',backref='users',lazy='dynamic')
	styles      = db.relationship('Styles',backref='users',lazy='dynamic')

	def __str__(self):
		return str(self.id)


class Hehe(db.Model):
	id          = db.Column(db.Integer(), primary_key=True)
	def __str__(self):
		return str(self.id)