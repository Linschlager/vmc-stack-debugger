# vmc-stack-debugger
Allows the walk-through of compiled VM-Code, used in the FHNW-Module cpib.

The two stored demo-programs are compiled from this program:
```
program Playground()
global
    record p(x: int32, y: int32);
    const x: int32;
    const y: int32;

    fun wrap(x: int32, y: int32) returns const r: p
    do
        r init := p(x, y)
    endfun
do
    debugin x init;
    debugin y init;
    debugout wrap(x, y)
endprogram

```
