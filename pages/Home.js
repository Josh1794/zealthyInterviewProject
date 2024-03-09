import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
export default function Home({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => navigation.navigate('AddTask')} icon='plus' />
    ),
  });
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Suspendisse accumsan tortor quis turpis.',
      description:
        'Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.',
      user: 1,
      complete: true,
      dateCreated: '11/29/2023',
      dateCompleted: '7/19/2023',
      completedBy: 1,
      attachment:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLfVPtT9JRFPbfKNssUVQUSgH5AYriTNcU3xey+YIUaqilYr6ks/INWQjmJMv5EigmCJGomeg07YNttWrl6kMf2/rQ1qZWk7ny6fdzZaLS2c7OfXbvec55zr3XD4CfL4+bFSBumi+m1rEPeVkx9uitg2e8gHheSNuPRS4CsU6eS6VPCxRauUrBGGfzvwTxVMUZfs1fHOPgeYS26K/F15MsGR2CLcEgeye3Sqj1SSCaItZjJwnPbst2YkMwzgXfwgHfxEHzSjVWPjlRryuERBl19UgCUqc4ZiIaIiuxnmI/C8faEJ58GIX+WTuYhlAUzqbD9rwPkV0ROKMNB6udQVadJDZInXvaSZ07cRY+xl91o21OgUZXLmpdcoj6CDC1YVCMSpGYQf+41wGpc5vUCcEDrllkIb6cd2TA8rILN2YKoHakI38kATJbJqwv+mFc0oPVGgahLNjpJYE/ylklTGwQQ2zYX/eieToP1fY05JvEkI6l4e5yO9TjUtxb7ACzmQFGA/17WG1whdcMiAG2R2bNgm6hApU2CfKGE5BjTsWdpVZUjGTiwmAySaAFo46OUHXQTkglDfTywH8D5BmjfpQ6FLi9WIf8+4nIHk6BbroeKnMaFAPJuDaixGWjDMX6dMja4r+dq2c10YpPNu0RCHq4migdEy0zdcgZkkA31QCVSQJ5fxJqh4twc6II02tGvPnshmFeBamBCV7ZMZ3XNbI1p5dpNScx+LQXLc5ylJBEbY8qUdCZhMl33Zh83wPKdAtKGBZKKIKtQ++f1chYZjUwcMVUCrW5DKwqBlIbI/F4bQD7zfXWSBEc/YnC1XRTSEXgz6BLp0DqBFHu/+uWWwGNW76brJmT++7goAcWBaxGKP2RrQtFl/vibmUqUvjQDHx5gOzEdoTiuIdM2KTa/hM7qb3flzV5wwl+LjkAAAAASUVORK5CYII=',
    },
    {
      id: 2,
      title: 'In hac habitasse platea dictumst.',
      description:
        'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
      user: 2,
      complete: false,
      dateCreated: '1/21/2024',
      dateCompleted: '4/20/2023',
      completedBy: 2,
      attachment:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALASURBVDjLhZJdSFNhGMcPSMJACLr1wptAkIIuC6zFKjJDb6QurNiFaCH2gWiFNh1rLodNJ/iBS5k5RdvcSSunpTYrc+QHSHFwbmzNbWd+bE7FWFgnn/6TFrKsLh4OvLy///N7nvMyRMTsrq7xUCpK0/EuNK23BgXd66DQPLw8XW9Z0jwcCKTG34+HiwFG+mfWaGh2g4Y/bdDL2XVip1apfSxI91k+UmHki/8IAJjYOR4aZCfD9GJmnTreBqnx1RKhK9U8D5DqKY/vIrUMr1B1f4Cu6z2DV1vdib8D0FXLfgiTeXKNoCsAlEBXFOtS3uMTlXZ5JbceewRVH09lPV663OTS7ATo3wQPt2LOvukwNQwtCbWWQIr6WSAJukroTtzt9k0Ud3iVhXpPUoHOnSJtdgnyXp5y6pxCdo0jjWkZWdY+sYXo0ehKVFdSxfLJchPvrhtYokqTn8q6fSTv9VNes8t9qcGVfLHeKUEI3Wj30FmVXcNA185OhUndz5PCzIuga6odWCToGgvb3OK8FpcYusbbXV7KqXWYstQOUYZ6HsFeEis4joHulhnLgy5BNwG6kTvoCl2xzWbLtlqtadAVX2l0UabaHjldNZdwUsGRzOijYzJunYHuVvf7VSrt9Ea3K7rW9jmqu1Jn/pgO+LvFYvlWrR/NgO7CKeUcHVdwovRKbme0o+XcJoPtOpWsn6AbgW4idE9EtwvYYJ93kH3eSQaDoSN6ll7BHULXfQD951Tz0QCOwXZvQrcAi9kf+22AD6Dzptls3ga8rdPpeK1Wm7T7AQEWoy4w8U8zWoCbAAs+/yIteHkCLKhUqgd73d0LPgL4x6/O44DHAW/LZLIvJSUlB/8bAHgE8FfArbEzwAbAm0VFRew/AwCfB+wHfC/+ImB5fn7+mFQqPfPXAMBgddl7zRotwFm5ubmZqITY2U/WPMCPgs5K+QAAAABJRU5ErkJggg==',
    },
    {
      id: 3,
      title: 'Curabitur convallis.',
      description:
        'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      user: 3,
      complete: false,
      dateCreated: '5/1/2023',
      dateCompleted: '3/20/2023',
      completedBy: 3,
      attachment:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALQSURBVBgZBcFfaJVlHADg532/bzvNo9MtY1oXRlRWsCREIlFXoaBmUEIkaH9uCsokEIK6qbtg4UVBIN0kFETQnVQ3FmXOxMwg1BApA9GdTdFJbLqzc87763lSRNjy/i+vDgw2dudkLe5AAgmRiKJbyj83r8eP6b+Zd44d3LEAkCLC9g+PH/ty39qHc07LgkoAEAHh2mzHV7/fNHWpfeuvs+eHJw7uaEMNuUqr++tq2bmrqpwSiSj0ouh2w+1Oz5MPLPH4g7WT5dqiKA/NjL313dDRT59pZ0gpLY6Iqr/K+jJ1ospUiZTIEoqVg/12rFvp3vsbA/Vg8xBkCBJk5EROSU5JTklOSa6S1o3bVi3ueGQ4ee2JO1V91QtQA0RQVyRJpKT0gpzUFf2R/X09LJSuUhZsvK8h1bkLNUQQqFMWQiDlJCEKUWX6ySUppRIyKYMaAgUpkSSBQBT6KkDKUi+JHAoigBpKlwgKEiIC5IyS1FUQiSAkvUKvADWUEiKCYL5927k/jpu8eMby4SFTV69b9/ROA0uGHDt8yMhdQ36dmTE0O1iPjb3brKFX6AWdhY4jh7/WiFkv79ltbm7O5cuX/Tbxrap/wM7nnlXXlVarpe/06frI+cEPaijdUCK8980xq69d9NKeXd7+6HOzF064e+UKo6OjWlf+deDAKZOtKevXrze2aaNLly69nqHb7en1qKfOGh5sgqde2W9+oWPXrl02bNhg27Zttm7d6la7440394GlS5c2aui2S+mWEnnpinS5dRL8dGhc9HrGx8c1m00wNzcnlfDJxwdiy+bN6cqVK/M1dOZ7083+avn+7WuaX3x2NE/8fNSLY4+yadT09LQLFy5oNBpWrVplZGREztnEiVO9ycnJqRQR1u39YW+3E88n8VhemF68/Mb3ffeMLEuNRp+EM3OrO920KNYs+rM/KdFuL5RWa3rm1uzMlv8B/jBGW3bkYMYAAAAASUVORK5CYII=',
    },
    {
      id: 4,
      title:
        'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      description:
        'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.',
      user: 4,
      complete: true,
      dateCreated: '5/20/2023',
      dateCompleted: '1/10/2024',
      completedBy: 4,
      attachment:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKGSURBVDjLhZNdSFNxFMBHCdGDr0sIg3qwiF6jwMeefY0giB56CoMIeuhN8KHXCJuoEYUZpJW0QMyPmWl+ldM5FTedujn34e7c7ma6z/vr/O9maRINfrtj55zfPed/7rUAloPceNxbKzQJTiEmJASP0Kxif+cfLKwUbELu87Sf+YDOmpZlM50nGN+h3xlAxco5lYcE5eLejiEPhaJBUIcPUynez6WYiGfZk6SioGIqR+XuS/YFNhVI5jA/acluH07ycmwbV7KIIf/JBb1YipclNlMgP64KRX88R/u4hlcrJfVM79E8qLGyg9lBRL7Scs0qDEMJiqrWvHufzNczp9M2HKNlKIY7CMsRGPemZZwM8QxERaBLK4kCpIS+0pnYlGDW5U/yanRLBFGav0SxO3U6R1ZUQljxbtRHWoo2pRvvNrg2C7j8uorPKoG2EPwpd47SIsWtIpn0pVUwJJwuE/JEMtjlULt+JE3cwV2Vo/0WNDui2AYiNA2EmVo9KnBv7NI1rfN6MiHEmTsgmJ1dT2BzhM3it2L3agaq7f0ROkd8LDXcYdDuYNTxjUDLfWbW/oxgHuLY6h6uKAR2wZcSkuDZyjAfyjC+lsf/0Ers3gmMF1XkOi4eOkRzjTlZTVR2tJSA6TB89UP/SoFPC1m+Nz5Ae1YBz8/D+gUYrsb+6LZhrvHggxSTdbliMCLFfcsG9sU88111RJ9ayHSeEoEUh4SAiAarYcLafeRRDqYMZqSD/uUCdneWufrrxCQt011VEniEiOA+Bzetb/75MjnXdRbDWVYb6tm6ayExcQyjrUZmKwtaz0Cd9Ynlf6/zrcaP2sbZCiN0yUK45niBWmuea1a4Ys1y2XryF6CZCaxnm2/nAAAAAElFTkSuQmCC',
    },
    {
      id: 5,
      title: 'Proin eu mi.',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
      user: 5,
      complete: false,
      dateCreated: '10/7/2023',
      dateCompleted: '1/3/2024',
      completedBy: 5,
      attachment:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJaSURBVDjLpVPNi1JRFP89v2f8RHHGaqOCJFNuohki+oBxE7Sp1oFQLXPXbqDFUG1btOgvyIKBoFmUixSJqERIzbFJ05lRpHn6xoYcP0af+nrnlmKBqzlwOPe+d3/nd37n3MtJkoSjmAJHNNVokcvlIoPBYFl29Pt9iKI49l6vN/Zut0sxGggE/ITjSIIMvqzRaGJ2u50d+t8mZarVasRiMZRKJX8wGIyyCmTG+xaLBTzPQ6vVjkGTQFpXKhWYTCa4XC4iXZE/R7lMJsPYbTYbGo3GP+WSFAJyHAelUsnYjUYj9Ho9wuEwCoWCX0XsVDpppUM6nY75iL3T6eDt86c4TL3E4VDeW0/h2t1V+Hw+ZLPZFRUxtVotCILAGkTA4XAIaibFr58i6Hx5hYEkQuKUaJYTePbkAW7cuceqpATLxEQbAsmSWMkKxZ8J86kI5ubdsJmNpBtmxzHUhTzMci8IqyJW0kpOCcgpAbGTGRxO3Axch35Gh4P6LlQGG16vr0P8O2qWYAQkkNfrZZGc5HzYrWEzGceZpSWYrHPY2cojJehwUv4/TkAToASj0Y36kE6nsbVdRHRmAfG195hVA8WDWTQlLRKJBKuaC4VCb2QtVyZuGYtCrcbGxVeraLfbOHf+AuYdDqy9CLFR0kj39oRv3LTHtPHw7DZ//KrzXVmD5q86qnIiYqSLptbqcem0HYvix/7Ux2SwnYjv72RQrvyA1WqF2+1mYI/HA3EwRHnzM/QmY0o1LYFkdd7mftYfFQvfbzX3qxflSg0kLZlMDip8fWNh0f6YszjyvwFmK4mzFto0SwAAAABJRU5ErkJggg==',
    },
    {
      id: 6,
      title: 'Phasellus in felis.',
      description:
        'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.',
      user: 6,
      complete: true,
      dateCreated: '1/28/2023',
      dateCompleted: '12/27/2023',
      completedBy: 6,
      attachment:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKFSURBVDjLfZM7aBRhEMd/3+7t7W7OmJjnxRjDKUYNnPEJHjZqo4WIEAQhFhY+asVGsLIUbGwVRMFGfKDpRWzEqCEKIko0GlQ0MV4e5u5279sZi+AjRh0Yhml+zPznP+Zy/+A5EdNXiiWILAtD57deCgKPS4f3bTwOkBI1B/ds62gOgsAY4/K/qAgktsrNu8OHgDlAKRLf9wNz5V6RChPMmJfkWscIvSmsCl+nQ54P11Gja0nRyMn9ORIx5gc0FVtwHBfHQOx8Itc0hp9+x1Q0g00sKd9nRUcbI28y1KebEJk/VQpAAMcxRDpO2isyWZ4iSirE1mJ1Ft/3mY1CGkMHRecJ8wtgDGqFKKlSsRHlakQslkQAU0UlIeUYVOer6gCozgECmpmZzaB4RJIQ2QRj0rRUXI6tGiXjlUHNPwCOYZHbzodPrVQmFlGjDdSaBkyxgbzOsKZrO93+/QWXcfR3gNfC0nADxaEi9ukIDL0lP/mF3MqdLG7bwDJ9gJ1+vVBEVXg5cZREhESErmicQkcn6oJTE1PbVE8yfYdl6/oYH76GYe8vgKpigN1zxgLAzU9Smv1C5v1dsvkDUBlk4Optth45xbvRBzT4OQ82z61g/uLXJKxHPJfMkhXULikh0QiokHx7RG77Cdqn+4OB84VaACfwzBRSpad1Kz3ZAuuyBfItm6kbfUj98vVI6RkqZTb1rkbijwTBKzq7dzg2io8DmIu3Bs+KmkKcaP7Hidui++ktnRJmu0KSbwOoxjy58YJNvWsxbh2Eu3h88fSYiuwwfxoDYOB84X2+72q767xFbfGPFR3ccDWfnw/xqv/M9dTfvs5GcTB4obesoqjIb6k/KyKoavY7re8z/KbjU2AAAAAASUVORK5CYII=',
    },
  ]);

  return (
    <SafeAreaView>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: '1px',
    borderRadius: '8px',
    marginTop: 5,
    alignSelf: 'center',
    paddingLeft: 5,
  },
  itemTitle: {
    width: '50%',
    overflow: 'hidden',
  },
});
