const Discord = require('discord.js')
const test = new Discord.Client({autorun: true})
const token = ''
const fs = require('fs')

const testID = ''

var testserver

// const d3link2 = 'https://us.diablo3.com/en/profile/arceus6666-1804/career'
// const d3link = 'https://us.diablo3.com/static/js/profile/profile.js?v=58-110'

test.login(token)

test.on('ready', () => {
  console.log('Testing\n.\n.\n.')
  test.user.setStatus('Online')
  testserver = test.user.client.guilds.find('id', testID)
})

test.on('message', message => {
  const cnt = message.content
  // const teamsChart = JSON.parse(fs.readFileSync('teamchart.json'))
  // const buildsChart = JSON.parse(fs.readFileSync('buildschart.json'))
  const orphanChart = JSON.parse(fs.readFileSync('orphan.json'))
  const chan = message.channel
  /*
  var destiny

  if (message.guild === null) {
    destiny = chan
  } else {
    destiny = message.guild.channels
  }

  if (testserver === null) {
    console.log()
  }
  */

  const embed = new Discord.RichEmbed()

  if (cnt.startsWith('!')) {
    var args = cnt.trim().split(/ +/g)
    var cmd = args.shift().toLowerCase()
  } else {
    args = null
    cmd = ''
  }

  // console.log(`destiny: ${destiny}`)
/*
  if (cmd === '!teams') {
    var teams = teamsChart['teams']
    switch (args.length) {
      case 0:
        embed.setDescription('Use !teams <action> [team number (1 - 9)]')
        chan.send(embed)
        break

      case 1:
        switch (args[0]) {
          case 'join':
            embed.setDescription('Use !teams join <team number (1 - 9)>')
            chan.send(embed)
            break
          case 'check':
            var v = teamsChart['teams']
            console.log(`cteam: ${JSON.stringify(v, null, 2)}`)
            for (var c in v) {
              const embed2 = new Discord.RichEmbed()
              var v2 = v[c]
              embed2.addField(c,
                `Players: ${v2['players']}\nPlayer 1: ${v2['player1']['name']}\nPlayer 2: ${v2['player2']['name']}\nPlayer 3: ${v2['player3']['name']}\nPlayer 4: ${v2['player4']['name']}\n`)
              chan.send(embed2)
            }
            break
          case 'leave':
            embed.setDescription('Use !teams leave <team number (1 - 9)>')
            chan.send(embed)
            break
          default:
            embed.setDescription('Invalid action, use !teams <action> [team number (1 - 9)]')
            chan.send(embed)
            break
        }
        break

      case 2:
        switch (args[0]) {
          case 'join':
            if (args[1] < 10) {
              var num = 'team' + args[1]
              // console.log(`num: ${num}`)
              var cteam = teams[num]
              // console.log(`cteam: ${JSON.stringify(cteam, null, 2)}`)
              var size = cteam['players']
              // onsole.log(`size: ${size}`)
              if (size < 4) {
                // console.log('in if(size<4)')
                var avalaible = true
                for (var team in teams) {
                  if (teams[team].players !== 4) {
                    for (var j = 0; j < 4; j++) {
                      var pt = 'player' + (j + 1)
                      // console.log(pt)
                      // console.log(`team: ${team[pt]}`)
                      if (teams[team][pt].name === `<@${message.author.id}>`) {
                        embed.setDescription(`You are already in ${team}`)
                        avalaible = false
                        break
                      }
                    }
                  }
                }
                // console.log(`avalaible: ${avalaible}`)
                if (avalaible) {
                  // console.log('in if (avalaible)')
                  for (var i = 0; i < 4; i++) {
                    // console.log('in for')
                    var cplayer = 'player' + (i + 1)
                    // console.log(cteam[cplayer].free)
                    if (cteam[cplayer].free) {
                      // console.log('in if (cteam[cplayer].free)')
                      cteam[cplayer]['name'] = `<@${message.author.id}>`
                      cteam['players']++
                      cteam[cplayer]['free'] = false
                      var s = JSON.stringify(teamsChart, null, 2)
                      fs.writeFileSync('teamchart.json', s, null)
                      embed.setDescription(`${message.author} joined ${num}`)
                      break
                    }
                  }
                }
                chan.send(embed)
              } else {
                embed.setDescription('Team full')
                chan.send(embed)
              }
            } else {
              embed.setDescription('Team not found')
              chan.send(embed)
            }
            break

          case 'check':
            if (args[1] < 10) {
              cteam = 'team' + args[1]
              v = teamsChart['teams']
              v2 = v[cteam]
              embed.addField(cteam,
                 `Players: ${v2['players']}\nPlayer 1: ${v2['player1'].name}\nPlayer 2: ${v2['player2'].name}\nPlayer 3: ${v2['player3'].name}\nPlayer 4: ${v2['player4'].name}\n`)
              chan.send(embed)
            }
            break

          case 'leave':
            if (args[1] < 10) {
              num = 'team' + args[1]
              cteam = teams[num]
              size = cteam['players']
              if (size > 0) {
                for (var c4 = 0; c4 < 4; c4++) {
                  // console.log('in: for')
                  cplayer = 'player' + (c4 + 1)
                  // console.log(`name: ${cteam[cplayer].name}`)
                  // console.log(`auth: ${message.author.id}`)
                  if (cteam[cplayer].name === `<@${message.author.id}>`) {
                    console.log(`name: ${cteam[cplayer].name}`)
                    cteam[cplayer].name = 'free'
                    cteam[cplayer].free = true
                    cteam['players']--
                    embed.setDescription(`${message.author} left ${num}`)
                    break
                  }
                  embed.setDescription(`You are not in ${num}`)
                }
                s = JSON.stringify(teamsChart, null, 2)
                fs.writeFileSync('teamchart.json', s, null)
                chan.send(embed)
              } else {
                embed.setDescription(`${num} is empty`)
                chan.send(embed)
              }
            } else {
              embed.setDescription(`Team ${args[1]} does not exist`)
              chan.send(embed)
            }
            break

          default:
            embed.setDescription('Invalid action, use !teams <action> [team number (1 - 9)]')
            chan.send(embed)
            break
        }
        break

      default:
        embed.setDescription('Use !teams <action> [team number (1 - 9)]')
        chan.send(embed).catch(message.author.send(embed))
        break
    }
  }
*/
  // var s = JSON.stringify(teamsChart, null, 2)
/*
  if (cmd === '!builds') {
    console.log(args.length)
    switch (args.length) {
      case 0:
        console.log(`\nin case0\n`)
        chan.send(embed.setDescription(`Use !builds check [class]`))
        break

      case 1:
        switch (args[0]) {
          case 'check':
            for (var cx in buildsChart) {
              // console.log(builds[cx])
              embed.addField(`Class: ${buildsChart[cx].class_name}`, `Builds: ${buildsChart[cx].builds_q}`)
            }
            chan.send(embed)
            break
          default:
            chan.send(embed.setDescription(`Use !builds check [class]`))
            break
        }
        break

      case 2:
        switch (args[0]) {
          case 'check':
            var class_
            console.log('\n' + args[1] + '\n')
            switch (args[1]) {
              case 'dh':
                class_ = 'class_dh'
                for (var cxx in buildsChart[class_].builds) {
                  console.log('cxx: ' + cxx)
                  console.log('im in: ' + buildsChart[class_].builds[cxx])
                  embed.addField(`Build: ${buildsChart[class_].builds[cxx].name}`, `Link: ${buildsChart[class_].builds[cxx].link}`)
                }
                chan.send(embed)
                break
              case 'necro':
                class_ = 'class_necro'
                for (var cxx in buildsChart[class_].builds) {
                  console.log('cxx: ' + cxx)
                  console.log('im in: ' + buildsChart[class_].builds)
                  embed.addField(`Build: ${buildsChart[class_].builds[cxx].name}`, `Link: ${buildsChart[class_].builds[cxx].link}`)
                }
                chan.send(embed)
                break
              case 'wiz':
                class_ = 'class_wiz'
                for (var cxx in buildsChart[class_].builds) {
                  console.log('cxx: ' + cxx)
                  console.log('im in: ' + buildsChart[class_].builds)
                  embed.addField(`Build: ${buildsChart[class_].builds[cxx].name}`, `Link: ${buildsChart[class_].builds[cxx].link}`)
                }
                chan.send(embed)
                break
              case 'sader':
                class_ = 'class_sader'
                for (var cxx in buildsChart[class_].builds) {
                  console.log('cxx: ' + cxx)
                  console.log('im in: ' + buildsChart[class_].builds)
                  embed.addField(`Build: ${buildsChart[class_].builds[cxx].name}`, `Link: ${buildsChart[class_].builds[cxx].link}`)
                }
                chan.send(embed)
                break
              case 'wd':
                class_ = 'class_wd'
                for (var cxx in buildsChart[class_].builds) {
                  console.log('cxx: ' + cxx)
                  console.log('im in: ' + buildsChart[class_].builds)
                  embed.addField(`Build: ${buildsChart[class_].builds[cxx].name}`, `Link: ${buildsChart[class_].builds[cxx].link}`)
                }
                chan.send(embed)
                break
              case 'monk':
                class_ = 'class_monk'
                for (var cxx in buildsChart[class_].builds) {
                  console.log('cxx: ' + cxx)
                  console.log('im in: ' + buildsChart[class_].builds)
                  embed.addField(`Build: ${buildsChart[class_].builds[cxx].name}`, `Link: ${buildsChart[class_].builds[cxx].link}`)
                }
                chan.send(embed)
                break
              case 'barb':
                class_ = 'class_barb'
                for (var cxx in buildsChart[class_].builds) {
                  console.log('cxx: ' + cxx)
                  console.log('im in: ' + buildsChart[class_].builds)
                  embed.addField(`Build: ${buildsChart[class_].builds[cxx].name}`, `Link: ${buildsChart[class_].builds[cxx].link}`)
                }
                chan.send(embed)
                break
              default:
                chan.send(embed.setDescription('Not such class.'))
            }

            break
          case 'add':
            message.delete()
            // console.log('\n' + args[1] + '\n')
            chan.send(embed.setDescription('Use !builds add <name> <link>'))
            break

          default:
            chan.send(embed.setDescription(`Use !builds check [class]`))
            break
        }
        break

      case 4:
        message.delete()
        console.log('in case4')
        switch (args[1]) {
          case 'dh':
            class_ = 'class_dh'
            console.log('cxx: ' + cxx)
            console.log('im in: ' + buildsChart[class_].builds)
            buildsChart[class_].builds_q++
            var index = 'build_' + buildsChart[class_].builds_q
            buildsChart[class_].builds[index] = {'name': args[2],
              'link': args[3]}
            var z = JSON.stringify(buildsChart, null, 2)
            fs.writeFileSync('buildschart.json', z, null)
            embed.setDescription(`Added build ${args[2]} to ${buildsChart[class_].class_name}.`)
            chan.send(embed)
            break
          case 'necro':
            class_ = 'class_necro'
            buildsChart[class_].builds_q++
            index = 'build_' + buildsChart[class_].builds_q
            buildsChart[class_].builds[index] = {'name': args[2],
              'link': args[3]}
            z = JSON.stringify(buildsChart, null, 2)
            fs.writeFileSync('buildschart.json', z, null)
            embed.setDescription(`Added build ${args[2]} to ${buildsChart[class_].class_name}.`)
            chan.send(embed)
            break
          case 'wiz':
            class_ = 'class_wiz'
            buildsChart[class_].builds_q++
            index = 'build_' + buildsChart[class_].builds_q
            buildsChart[class_].builds[index] = {'name': args[2],
              'link': args[3]}
            z = JSON.stringify(buildsChart, null, 2)
            fs.writeFileSync('buildschart.json', z, null)
            embed.setDescription(`Added build ${args[2]} to ${buildsChart[class_].class_name}.`)
            chan.send(embed)
            break
          case 'sader':
            class_ = 'class_sader'
            buildsChart[class_].builds_q++
            index = 'build_' + buildsChart[class_].builds_q
            buildsChart[class_].builds[index] = {'name': args[2],
              'link': args[3]}
            z = JSON.stringify(buildsChart, null, 2)
            fs.writeFileSync('buildschart.json', z, null)
            embed.setDescription(`Added build ${args[2]} to ${buildsChart[class_].class_name}.`)
            chan.send(embed)
            break
          case 'wd':
            class_ = 'class_wd'
            buildsChart[class_].builds_q++
            index = 'build_' + buildsChart[class_].builds_q
            buildsChart[class_].builds[index] = {'name': args[2],
              'link': args[3]}
            z = JSON.stringify(buildsChart, null, 2)
            fs.writeFileSync('buildschart.json', z, null)
            embed.setDescription(`Added build ${args[2]} to ${buildsChart[class_].class_name}.`)
            chan.send(embed)
            break
          case 'monk':
            class_ = 'class_monk'
            buildsChart[class_].builds_q++
            index = 'build_' + buildsChart[class_].builds_q
            buildsChart[class_].builds[index] = {'name': args[2],
              'link': args[3]}
            z = JSON.stringify(buildsChart, null, 2)
            fs.writeFileSync('buildschart.json', z, null)
            embed.setDescription(`Added build ${args[2]} to ${buildsChart[class_].class_name}.`)
            chan.send(embed)
            break
          case 'barb':
            class_ = 'class_barb'
            buildsChart[class_].builds_q++
            console.log('quantity up to ' + buildsChart[class_].builds_q)
            index = 'build_' + buildsChart[class_].builds_q
            console.log('index: ' + index)
            // console.log(buildsChart[class_].builds)
            buildsChart[class_].builds[index] = {'name': args[2],
              'link': args[3]}
            z = JSON.stringify(buildsChart, null, 2)
            fs.writeFileSync('buildschart.json', z, null)
            embed.setDescription(`Added build ${args[2]} to ${buildsChart[class_].class_name}.`)
            chan.send(embed)
            break
        }
        break
      default:
        chan.send(embed.setDescription('Use !builds add <name(with no blank spaces)> <link>'))
        break
    }
  }
*/

  if (cmd === '!help') {
    const help = JSON.parse(fs.readFileSync('help.json', 'utf8'))
    for (var c in help) {
      if (c !== 'prefix') {
        embed.addField(`${help[c].name}`,
        `${help[c].desc}\n**Usage:** ${help[c].usage}`)
      }
    }
    chan.send(embed)
  }

  if (cmd === '!orphan') {
    var ind = orphanChart.size
    var index = 'pending_' + ind
    var name = message.author.username
    var id = message.author.id
    var av = true

    for (var x in orphanChart.list) {
      if (orphanChart.list[x].id === null) {
        break
      }
      if (orphanChart.list[x].id === id) {
        av = false
      }
    }

    if (av) {
      // console.log('\nin av\n')
      orphanChart.size++
      orphanChart['list'][index] = {'name': name, 'id': id}
      fs.writeFileSync('orphan.json', JSON.stringify(orphanChart, null, 2), null)
      chan.send(embed.setDescription('You are pending for approval.'))
    } else {
      chan.send(embed.setDescription('You are already pending for approval.'))
    }
  }

  if (cmd === '!approve' && args[0] !== null && chan === message.guild.channels.find('name', 'officer')) {
    const r = message.guild.roles
    const roles = [r.find('name', 'Headmaster'),
      r.find('name', 'Jackass'), r.find('name', 'Officer')]
    var access = false
    var access2 = false

    // console.log(roles)

    for (var xx in roles) {
      console.log('xx: ' + roles[xx])
      // console.log(message.member.roles)
      if (roles[xx] !== null && message.member.roles.has(roles[xx].id)) {
        access = true
        break
      }
    }

    if (access) {
      console.log('args: ' + args[0])
      for (x in orphanChart.list) {
        if (orphanChart.list[x].name === args[0]) {
          id = orphanChart.list[x].id
          delete orphanChart.list[x]
          access2 = true
          break
        }
      }
      if (access2) {
        orphanChart.size--
        fs.writeFileSync('orphan.json', JSON.stringify(orphanChart, null, 2), null)
        console.log('id: ' + id)
        var memberx = message.guild.members.get(id)
        console.log('memberx: ' + memberx)
        var role = message.guild.roles.find('name', 'Orphan')
        memberx.addRole(role).catch(console.error)
        memberx.user.send(embed.setDescription(`You are an Orphan now!`))
        chan.send(`<@${memberx.id}> is an Orphan now`)
      } else {
        chan.send(embed.setDescription('Couldn\'t find user'))
      }
    } else {
      chan.send(embed.setDescription('You do not have access to this command'))
    }
  }

  if (cmd === '!talkme') {
    message.author.send('o/')
  }
})

test.on('guildMemberAdd', member => {
  const embed = new Discord.RichEmbed()
  .setDescription(`**${member.user.username} joined.**`)
  var role = testserver.roles.find('name', 'guest')
  // to auto add role when ppl join
  member.addRole(role).catch(console.error)
  member.guild.channels.find('name', 'general').send(embed)
})
